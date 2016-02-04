/*global angular*/





angular.module('speedvocab.directives', []);

import {BootstrapControllers} from './controllers.js';
import {BootstrapFactories} from './factories.js';

BootstrapControllers(angular.module('speedvocab.controllers', []));
BootstrapFactories(angular.module('speedvocab.factories', []));

angular.module('speedvocab', [
    // 3rd parties
    'btford.socket-io',
    
    // local
    'speedvocab.controllers',
    'speedvocab.factories',
    'speedvocab.directives'
    ]);