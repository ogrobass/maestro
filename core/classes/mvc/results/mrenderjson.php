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

class MRenderJSON extends MResult {

    public function __construct($json = '') {
        parent::__construct();
        if ($json == '') {
            if ($this->ajax->isEmpty()) {
                $this->ajax->setId($this->page->getName());
                $this->ajax->setType('page');
                $data = $this->page->generate();
                $this->ajax->setData($data);
            } else {
                $this->ajax->setResponseType('JSON');
                $this->ajax->setId('');
                $this->ajax->setType('json');
            }
            $this->content = $this->ajax->returnData();
        } else {
            $this->ajax->setResponseType('JSON');
            $this->ajax->setData($json);
            $this->content = $this->ajax->returnJSON();
        }
    }

    public function apply($request, $response) {
        $this->nocache($response);
        $response->out = $this->content;
    }

}

?>