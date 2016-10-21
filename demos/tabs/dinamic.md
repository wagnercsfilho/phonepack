---
layout: examples
title: PhonePack
permalink: /demos/tabs/dinamic/
---

<header class="header bg-indigo text-white">
    <div class="header__title">Tabs</div>
</header>

<div class="sub-header header--shadow">
    <div id="tab" class="tab-bar bg-indigo tab-bar--text-white tab-bar--indicator-bottom-white">
      <div class="tab-bar__item ripple active" ref="#tab1">
        TEXT 1
      </div>
      <div class="tab-bar__item ripple" ref="#tab2">
        TEXT 2
      </div>
      <div class="tab-bar__item ripple" ref="#tab3">
        TEXT 3
      </div>
    </div>
</div>

<section class="content content--padding has-header has-sub-header" id="tab1">
      Tab 1
</section>
  
<section class="content content--padding has-header has-sub-header" id="tab2">
      Tab 2
</section>
  
<section class="content content--padding has-header has-sub-header" id="tab3">
      Tab 3
</section>

<script>
    var tabBar = new phonepack.TabBar(document.querySelector('#tab'));
</script>

  