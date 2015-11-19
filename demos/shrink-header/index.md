---
layout: examples
title: PhonePack
permalink: /demos/shrink-header/index/
---

<header class="header header--shadow text-black">
      <div class="header__title">Shrink Header</div>
</header>
    
<section class="content has-header">
        <ul class="list">
        </ul>
</section>
    
<script>
        
        var list = document.querySelector('.list');
        for(var i = 0; i < 30; i++) {
            var listItem = document.createElement('li');
            listItem.className = 'list__item';
            listItem.innerHTML = i.toString();
            list.appendChild(listItem);
        }
        
        phonepack.shrinkHeader(document.querySelector('.header'));
      
</script> 

      