---
layout: examples
title: PhonePack
permalink: /demos/notification/index/
---

<header class="header header--shadow bg-white text-black">
      <div class="header__title">Notification</div>
</header>
    
<section class="content content--padding has-header">
        <button class="button button--raised button--ripple bg-indigo text-white" id="open">Open Notification</button>
</section>
    
<script type="text/javascript">
        document.addEventListener('DOMContentLoaded', function() {
            
            document.querySelector('#open').addEventListener('click', function(){
                
                var notification = new phonepack.Notification();
                notification.warning('Warning message');
                
            });
            
          }, false);
</script>
  