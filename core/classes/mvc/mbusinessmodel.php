<?php
/* Copyright [2011, 2012, 2013] da Universidade Federal de Juiz de Fora
 * Este arquivo é parte do programa Framework Maestro.
 * O Framework Maestro é um software livre; você pode redistribuí-lo e/ou 
 * modificá-lo dentro dos termos da Licença Pública Geral GNU como publicada 
 * pela Fundação do Software Livre (FSF); na versão 2 da Licença.
 * Este programa é distribuído na esperança que possa ser  útil, 
 * mas SEM NENHUMA GARANTIA; sem uma garantia implícita de ADEQUAÇÃO a qualquer
 * MERCADO ou APLICAÇÃO EM PARTICULAR. Veja a Licença Pública Geral GNU/GPL 
 * em português para maiores detalhes.
 * Você deve ter recebido uma cópia da Licença Pública Geral GNU, sob o título
 * "LICENCA.txt", junto com este programa, se não, acesse o Portal do Software
 * Público Brasileiro no endereço www.softwarepublico.gov.br ou escreva para a 
 * Fundação do Software Livre(FSF) Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301, USA.
 */
/**
 * Classe base de todos os Business Models.
 * Business Models são modelos que contém regras de negócio e são, geralmente, persistentes.
 * 
 * @category    Maestro
 * @package     Core
 * @subpackage  MVC
 * @version     1.0 
 * @since       1.0
 */
class MBusinessModel extends PersistentObject {
    
    /**
     * Namespace do Model.
     * @var string 
     */
    private $_namespace;
    /**
     * ORMMap do Model.
     * @var array
     */
    private $_map;

    /**
     * Instancia Model e opcionalmente inicializa atributos com $data.
     * @param mixed $data
     */
    public function __construct($data = NULL) {
        parent::__construct();
        $this->_className = get_class($this);
        $p = strrpos($this->_className, '\\');
        $this->_namespace = substr($this->_className, 0, $p);
        $this->_map = $this->ORMMap();
        $this->onCreate($data);
    }

    /**
     * Inicializa atributos com $data.
     * @param mixed $data
     * @return void
     */
    private function onCreate($data = NULL) {
        if (is_null($data)) {
            return;
        } elseif (is_object($data)) {
            $oid = $this->getOIDName();
            $id = $data->$oid ? : $data->id;
            $this->getById($id);
            $this->setData($data);
        } else {
            $this->getById($data);
        }
    }

    /**
     * Instancia Model e opcionalmente inicializa atributos com $data.
     * @param type $data
     * @return Model
     */
    public static function create($data = NULL) {
        $className = get_called_class();
        return new $className($data);
    }

    /**
     * Array de configuração do Model.
     * @return array
     */
    public static function config() {
        return array();
    }
    
    /**
     * Nome da classe do Model. 
     * @return string
     */
    public function getClassName() {
        return $this->_className;
    }

    /**
     * Namespace do Model.
     * @return string
     */
    public function getNamespace() {
        return $this->_namespace;
    }

    /**
     * Array com o mapa de atributos do Model.
     * @return array
     */
    public function getAttributesMap() {
        $attributes = array();
        $map = $this->_map;
        do {
            $attributes = array_merge($attributes, $map['attributes']);
            if ($map['extends']) {
                $class = $map['extends'];
                $map = $class::ORMMap();
            } else {
                $map = NULL;
            }
        } while ($map);
        return $attributes;
    }

    /**
     * Array com o mapa de associações do Model.
     * @return array
     */
    public function getAssociationsMap() {
        return $this->_map['associations'];
    }

    /**
     * Valor do atributo de descrição do Model.
     * @return string
     */
    public function getDescription() {
        return $this->_className;
    }

    /**
     * Descrição usada para Log.
     * @return string
     */
    public function getLogDescription() {
        $config = $this->config();
        if (count($config['log'])) {
            $data = new stdClass();
            foreach ($config['log'] as $attr) {
                $data->$attr = $this->get($attr);
            }
            $description = serialize($data);
        } else {
            $description = '';
        }
        return $description;
    }

    /**
     * Inicaliza atributos com base no OID.
     * @param type $id
     * @return \MBusinessModel
     */
    public function getById($id) {
        if (($id !== '') && ($id !== NULL)) {
            $this->set($this->getPKName(), $id);
            $this->retrieve();
            return $this;
        }
    }
    
    public static function getByIds(array $ids) {
        $instance = new static;

        return $instance->getCriteria()
                        ->where($instance->getPKName(), 'in', $ids)
                        ->asCursor()
                        ->getObjects();
    }

    /**
     * Criteria genérico do Model. $filter indica filtros a serem usados na
     * consulta, $attribute indica os atributos a serem retornados e $order
     * o atributo usado para ordenar o resultado da consulta.
     * @param object $filter
     * @param string $attribute
     * @param string $order
     * @return criteria
     */
    public function listAll($filter = '', $attribute = '', $order = '') {
        $criteria = $this->getCriteria();
        if ($attribute != '') {
            $criteria->addCriteria($attribute, 'LIKE', $filter . '%');
        }
        if ($order != '') {
            $criteria->addOrderAttribute($order);
        }
        return $criteria;
    }

    /**
     * Novo OID, usado em operações de inserção.
     * @param string $idGenerator
     * @return integer
     */
    public function getNewId($idGenerator) {
        return $this->getDb()->getNewId($idGenerator);
    }

    /**
     * Retorna handler para a conexão corrente no Database.
     * @return Connectiion
     */
    public function getTransaction() {
        return $this->getDb()->getTransaction();
    }

    /**
     * Coloca a conexão em estado de transação e retorna um handler para a
     * conexão.
     * @return Connection
     */
    public function beginTransaction() {
        return $this->getDb()->beginTransaction();
    }

    /**
     * Atribui $value para o atributo $attribute.
     * @param string $attribute
     * @param mixed $value
     */
    public function set($attribute, $value) {
        $method = 'set' . $attribute;
        $this->$method($value);
    }

    /**
     * Valor corrente do atributo $attribute.
     * @param string $attribute
     * @return mixed
     */
    public function get($attribute) {
        $method = 'get' . $attribute;
        return $this->$method();
    }

    /**
     * O objeto referenciado em associações oneToOne é definido com base em seu OID.
     * @param string $associationName
     * @param integer $id
     * @throws EPersistentManagerException
     */
    public function setAssociationId($associationName, $id) {
        $classMap = $this->getClassMap();
        $associationMap = $classMap->getAssociationMap($associationName);
        if (is_null($associationMap)) {
            throw new EPersistentManagerException("Association name [{$associationName}] not found.");
        }
        $fromAttribute = $associationMap->getFromAttributeMap()->getName();
        $toClass = $associationMap->getToClassName();
        if ($associationMap->getCardinality() == 'oneToOne') {
            $refObject = new $toClass($id);
            $this->set($associationName, $refObject);
            $this->set($fromAttribute, $id);
        } else {
            $array = array();
            if (!is_array($id)) {
                $id = array($id);
            }
            foreach ($id as $oid) {
                $array[] = new $toClass($oid);
            }
            $this->set($associationName, $array);
        }
    }

    /**
     * Retorna um ValueObject com atributos com valores planos (tipo simples).
     * @return \stdClass
     */
    public function getData() {
        $data = new stdClass();
        $attributes = $this->getAttributesMap();
        foreach ($attributes as $attribute => $definition) {
            $method = 'get' . $attribute;
            if (method_exists($this, $method)) {
                $type = $definition['type'];
                $rawValue = $this->$method();
                if (isset($rawValue)) {
                    if ($definition['key'] == 'primary') {
                        $data->id = $rawValue;
                        $data->idName = $attr;
                    }
                    $conversion = 'getPlain' . $type;
                    $value = MTypes::$conversion($rawValue);
                    $data->$attribute = $value;
                }
            }
        }
        $data->description = $this->getDescription();
        return $data;
    }

    /**
     * Recebe um ValueObject com valores planos e inicializa os atributos do Model.
     * @param object $data
     */
    public function setData($data) {
        if (is_null($data)) {
            return;
        }
        $attributes = $this->getAttributesMap();
        foreach ($attributes as $attribute => $definition) {
            $valid = false;
            if (isset($data->$attribute)) {
                $value = $data->$attribute;
                $valid = true;
            } elseif (is_array($data) && isset($data[$attribute])) {
                $value = $data[$attribute];
                $valid = true;
            }
            if ($valid) {
                $type = $definition['type'];
                $conversion = 'get' . $type;
                $typedValue = MTypes::$conversion($value);
                $this->set($attribute, $typedValue);
            }
        }
    }

    /**
     * Validação dos valores de atributos com base em $config[validators]. 
     * $exception indica se deve ser disparada uma exceção em caso de falha.
     * @param boolean $exception
     */
    public function validate($exception = true) {
        $validator = new MDataValidator();
        return $validator->validateModel($this, $exception);
    }

}

?>