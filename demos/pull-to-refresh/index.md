---
layout: examples
title: PhonePack
permalink: /demos/pull-to-refresh/index/
---

<header class="header header--shadow text-black">
      <div class="header__title">Pull to Refresh</div>
</header>
    
<section class="content has-header">
        <ul class="list">
        </ul>
</section>
    
<script>
        
        var list = document.querySelector('.list');
        for(var i = 0; i < 50; i++) {
            var listItem = document.createElement('li');
            listItem.className = 'list__item';
            listItem.innerHTML = i.toString();
            list.appendChild(listItem);
        }
        
        var pullToRefresh = new phonepack.PullToRefresh(document.querySelector('.content'), { type: 'snake' }, function(){
            setTimeout(function(){
                var listItem = document.createElement('li');
                listItem.className = 'list__item';
                listItem.innerHTML = i++;
                list.appendChild(listItem);
                pullToRefresh.hide();
            }, 1000);
        });
        
</script> 

      