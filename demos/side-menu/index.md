---
layout: examples
title: PhonePack
permalink: /demos/side-menu/index/
---

<div class="side-menu" id="side-menu">
        <header class="header">
            <div class="header__title">Title</div>
        </header>
        <ul class="list">
            <li class="list__item"> Item 01 </li>
            <li class="list__item"> Item 02 </li>
        </ul>
</div>

<div class="navigation">
        <div class="pages">
            <header class="header header--shadow bg-white text-black">
                <div class="header__buttons">
                    <button class="button button--icon button--ripple text-black" id="open">
                        <i class="icon mdi mdi-menu"></i>
                    </button>
                </div>
                <div class="header__title">Side Menu</div>
            </header>
            <section class="content has-header">
            </section>
        </div>
</div>

<script type="text/javascript">
        document.addEventListener('DOMContentLoaded', function() {

            sideMenu = new phonepack.SideMenu(document.getElementById('side-menu'),
            {
                type: 'overlap'
            });

            document.querySelector('#open').addEventListener('click', function() {
                sideMenu.toggle();
            });

        }, false);
</script>

