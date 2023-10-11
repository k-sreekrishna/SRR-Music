    (function () {
        "use strict";
        
        function mainAppNew() {
            function main_fun() {
                var switchPanel = document.getElementById('switch-panel');
                var switcher = document.querySelector('.switcher');
                var mainCSS = document.getElementById('mainCSS');
                
                switchPanel.addEventListener('click', function () {
                    if (switchPanel.classList.contains('show-panel')) {
                        switcher.style.left = '-50px';
                        switchPanel.classList.remove('show-panel');
                        switchPanel.classList.add('hide-panel');
                    } else if (switchPanel.classList.contains('hide-panel')) {
                        switcher.style.left = '0';
                        switchPanel.classList.remove('hide-panel');
                        switchPanel.classList.add('show-panel');
                    }
                });
                
                document.getElementById('green').addEventListener('click', function () {
                    mainCSS.setAttribute('href', 'assets/css/themes/green.css');
                });
                
                document.getElementById('red').addEventListener('click', function () {
                    mainCSS.setAttribute('href', 'assets/css/themes/red.css');
                });
                
                document.getElementById('orange').addEventListener('click', function () {
                    mainCSS.setAttribute('href', 'assets/css/themes/orange.css');
                });
            }
            
            function initialization() {
                main_fun();
            }
            
            return {
                main_fun: main_fun,
                initialization: initialization
            };
        }
        
        // Initializing
        var mainApp = mainAppNew();
        
        document.addEventListener('DOMContentLoaded', function () {
            mainApp.main_fun();
        });
    
    })();
    