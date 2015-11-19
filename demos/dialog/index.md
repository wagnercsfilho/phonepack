---
layout: examples
title: PhonePack
permalink: /demos/dialog/index/
---

<header class="header header--shadow bg-white text-black">
      <div class="header__title">Dialog</div>
</header>
    
<section class="content content--padding has-header">
        <button class="button button--raised button--ripple bg-indigo text-white" id="open">Open Dialog</button>
</section>
    
<script type="text/javascript">
        document.addEventListener('DOMContentLoaded', function() {
            
            document.querySelector('#open').addEventListener('click', function(){
                var dialog = new phonepack.Dialog({
                    title: 'Dialog',
                    content: 'Lorem ipsum dolor sit amet'      
                }).show(function(){
                    dialog.hide();
                });
            });
            
          }, false);
</script>
  

      