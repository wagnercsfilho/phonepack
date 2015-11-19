---
layout: examples
title: PhonePack
permalink: /demos/loading/index/
---

<header class="header header--shadow bg-white text-black">
      <div class="header__title">Loading</div>
</header>
    
<section class="content content--padding has-header">
        <button class="button button--raised button--ripple bg-indigo text-white" id="open">Open Loading</button>
</section>
    
<script type="text/javascript">
        document.addEventListener('DOMContentLoaded', function() {
            
            document.querySelector('#open').addEventListener('click', function(){
                var loading = new phonepack.Loading({
                    spinner: true,
                    overlay: false,
                    title: 'Loading'
                }).show();
                
                setTimeout(function() {
                    loading.hide();
                }, 1000);
            });
            
          }, false);
</script>
  