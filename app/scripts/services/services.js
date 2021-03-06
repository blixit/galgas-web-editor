/**
 * Created by blixit on 07/06/17.
 */
'use strict';

app.service('GWContainer', function () {

  return {
    get : function (component, argsArray) {
      argsArray = argsArray || [];

      var promised = null;
      var container = null;

      switch(component){

        case 'GWConsole':
          container = new GWEditorContainer();
          promised = container.get('GWConsole');

          break;


        case 'GWConsoleInterface':
          container = new GWEditorContainer();
          var console_ = null;
          if(argsArray.length > 0){
            console_ = argsArray[0];
          }else{
            console_ = container.get('GWConsole');
          }

          promised = container.get('GWConsoleInterface',[console_]);

          break;

        case 'GWCodeEditor':
          container = new GWEditorContainer();
          promised = container.get('GWCodeEditor');

          break;


        case 'GWCodeEditorInterface':
          container = new GWEditorContainer();
          var codeEditor = null;
          if(argsArray.length > 0){
            codeEditor = argsArray[0];
          }else{
            codeEditor = container.get('GWCodeEditor');
          }

          promised = container.get('GWCodeEditorInterface',[codeEditor]);

          break;

        case 'GWPComponent':
          container = new GWComponentContainer();
          promised = container.get(argsArray[0]);

          break;


        default :
          throw new function () {
            this.message = component+" is not provided by this service.";
            this.toString = function () {
              return this.message;
            }
          };
      }

      return promised;
    }
  }

});

app.service('dataProvider', function () {

  return  {
    getTargets : function () {
      return [
        'makefile-unix',
        'makefile-macosx',
        'makefile-x86linux32-on-macosx',
        'makefile-x86linux64-on-macosx',
        'makefile-win32-on-macosx',
        'LatestMacOS',
        'codeblocks-windows',
        'codeblocks-linux32',
        'codeblocks-linux64',
        'codeblocks-mac'
      ];
    },
    getComponents : function () {
      return [
        new GWPComponentLexicon('mylexicon',true),
        new GWPComponentLexicon('mylexicon2',true),
        new GWPComponentSyntax('mysyntax',true),
        new GWPComponentGrammar('mygrammar',true),
        new GWPComponentProgram('myprog',true)
      ]
    }

  };

});
