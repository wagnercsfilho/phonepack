---
layout: examples
title: PhonePack
permalink: /demos/infinite-scroll/index/
---

<header class="header header--shadow text-black">
      <div class="header__title">Infinity Scroll</div>
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
        
        var infiniteScroll = new phonepack.InfiniteScroll(document.querySelector('.content'), { distance: 50 }, function(){
            setTimeout(function(){
                var listItem = document.createElement('li');
                listItem.className = 'list__item';
                listItem.innerHTML = i++;
                list.appendChild(listItem);
                infiniteScroll.hide();
            }, 2000);
        });
        
        
</script> 

      