---
layout: examples
title: PhonePack
permalink: /demos/navigation/index/
---



<script type="text/javascript">
        document.addEventListener('DOMContentLoaded', function() {

            var logged = false;

            var options = {
                page: '/demos/navigation/list'
            };

            window.navigation = new phonepack.Navigation(document.getElementById('navigation'), options);

            navigation.on('beforePush', function(template, next) {
                if (!logged && template.getAttribute('ref') !== 'login') {
                    navigation.pushPage('/demos/navigation/login');
                }
                else {
                    next();
                }
            });

            phonepack('#login').on('click', function() {
                var email = document.querySelector('#txtEmail');
                var password = document.querySelector('#txtPassword');

                logged = true;
                var notification = new phonepack.Notification();
                notification.success('Login!');
                navigation.pushPage('/demos/navigation/list');

            });

            phonepack('#open').on('click', function() {
                navigation.pushPage('/demos/navigation/details', {
                    foo: 'bar'
                }, function() {});
            });

        }, false);
        
</script>

<div id="navigation" class="navigation"></div>

