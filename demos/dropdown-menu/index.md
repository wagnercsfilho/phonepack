---
layout: examples
title: PhonePack
permalink: /demos/dropdown-menu/index/
---

<div id="pages">

    <header class="header header--shadow bg-white text-black">
            <div class="header__title">DropDown Menu</div>

            <div class="header__buttons">
                <button class="button button--icon button--ripple" id="open">
                    <i class="icon mdi mdi-dots-vertical"></i>
                </button>

                <div class="dropdown-menu" id="dropMenu">
                    <ul>
                        <li class="dropdown-item" id="moveToTrash">
                            <div class="item-primary">
                                <i class="icon mdi mdi-dots-vertical"></i>
                            </div>
                            <div class="item-content">Move to trash</div>
                        </li>
                        <li class="dropdown-divider"></li>
                        <li class="dropdown-item">
                            <div class="item-primary">
                                <i class="icon mdi mdi-dots-vertical"></i>
                            </div>
                            <div class="item-content">Undo</div>
                        </li>
                        <li class="dropdown-item">
                            <div class="item-primary">
                                <i class="icon mdi mdi-dots-vertical"></i>
                            </div>
                            <div class="item-content">Redo</div>
                        </li>
                        <li class="dropdown-divider"></li>
                        <li class="dropdown-item">
                            <div class="item-content">Zoom in</div>
                        </li>
                        <li class="dropdown-item">
                            <div class="item-content">Zoom out</div>
                        </li>
                    </ul>
                </div>
            </div>


        </header>

        <section class="content has-header">
        </section>
</div>

<script type="text/javascript">
        document.addEventListener('DOMContentLoaded', function() {

            phonepack.DropDownMenu(document.querySelector('#open'), document.getElementById('dropMenu'), 'left');
            
            document.querySelector("#moveToTrash").addEventListener('click', function(){
                alert('Action!');
            }, false)

        }, false);
</script>

    