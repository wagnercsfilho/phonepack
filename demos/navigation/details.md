---
layout: examples
title: PhonePack
permalink: /demos/navigation/details/
---

<div class="pages" ref="details">
<header class="header header--transparent bg-white text-white">
        <div class="header__buttons">
            <button class="button button--icon button--ripple text-white" onclick="navigation.closeCurrentPage()">
                <i class="icon mdi mdi-arrow-left"></i>
            </button>
        </div>
        <div class="header__title"></div>
</header>


<section class="content">
        <div class="list card" style="z-index: 1;">
            <div class="list__item card__image">
                <img src="http://lorempixel.com/400/300/people/1" class="card__image--pic">
                <h2 class="card__image--text">AVA</h2>
                <div class="card__image--action">
                    <button class="button button--fab bg-pink text-color button--ripple">
                        <i class="icon mdi mdi-star"></i>
                    </button>
                </div>
            </div>
        </div>

        <ul class="list">
            <li class="list__item with-separator" id="open">
                <div class="list__primary">
                    <i class="icon text-blue mdi mdi-phone"></i>
                </div>
                <div class="list__content">
                    (650) 555-1234
                    <div class="list__caption">
                        Mobile
                    </div>
                </div>
            </li>
            <li class="list__item with-separator" id="open">
                <div class="list__primary">
                </div>
                <div class="list__content">
                    (326) 555-5874
                    <div class="list__caption">
                        Work
                    </div>
                </div>
            </li>

            <li class="list__divider list__divider--pushed"></li>

            <li class="list__item with-separator" id="open">
                <div class="list__primary">
                    <i class="icon text-blue mdi mdi-email"></i>
                </div>
                <div class="list__content">
                    aliconners@example.com
                    <div class="list__caption">
                        Personal
                    </div>
                </div>
            </li>
            <li class="list__item with-separator" id="open">
                <div class="list__primary">
                </div>
                <div class="list__content">
                    ali_conners@example.com
                    <div class="list__caption">
                        Work
                    </div>
                </div>
            </li>

        </ul>
</section>
</div>
