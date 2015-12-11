---
layout: default
title: PhonePack - JavaScript Components
permalink: /javascript/
---

 <script>
    	$(function(){
		        // Check the initial Poistion of the Sticky Header
		        var sideMenu = $('#sideBar').offset().top;
		        var iFrameDevice = $('#iFrameDevice');
		        var currentElement = null;
		        iFrameDevice.attr('src', $('#sideBar>ul>li a').first().attr('rel'));
		        
		        $(window).on('hashchange', function(e) {
		        	e.preventDefault();
			        return false;
			    });

		        $(window).scroll(function(){
					viewDocs();		                
		        });
		        
		        function viewDocs(){
		        	if( $(window).scrollTop() > sideMenu ) {
		                        $('#sideBar').css({position: 'fixed', top: '0px', bottom: '0',  overflow: 'auto'});
		                        $('#device').css({position: 'fixed', top: '0px', bottom: '0', height: 'auto'});
		                } else {
		                        $('#sideBar').css({position: 'static', top: '0px'});
		                        $('#device').css({position: 'static', top: '0px', height: '813px'});
		                }
		                
		                $('#sideBar>ul>li a').each(function(){
		                	 var _currLink = $(this);
        					 var _refElement = $(_currLink.attr("href"));
        					 var _link = _currLink.attr('rel');
        					 
        					 if ((_link) && (_refElement.offset())) {
        					 	
        					 	var offset = _refElement.offset().top;
        					 	var scrollTop = $(window).scrollTop();
        					 	
	        					 if ((currentElement !== _refElement[0]) && (scrollTop + 100 > offset) && (scrollTop + 100 < ((offset) + _refElement.height()))) {
	        					 	currentElement = _refElement[0];
	        					 	iFrameDevice.attr('src', _currLink.attr('rel'));
	        					 	
	        					 	if (!_currLink.parents('li.active').length) {
	        					 		$('li.active').removeClass('active');
	        					 	}
	        					 	
	        					 	$('#sideBar>ul>li a').removeClass('active');
	        					 	$('.docs section').css('opacity', '0.6');
	        					 	
	        					 	_currLink.addClass('active');
	        					 	_currLink.parents('li').addClass('active');
	        					 	history.pushState(null, null, _currLink.attr("href"));
	        					 	_refElement.css('opacity', 1);
	        					 	$('.demo').remove();
	        					 	_refElement.append('<a href="'+ _currLink.attr('rel') + '"  class="demo btn btn-default">Demo</a>');
	        					 	//window.location.hash = _currLink.attr("href");
	        					 	return false;
				                 }
				                 
        					 }
		                });
		        }
		        
		        viewDocs();
		});
    </script>

<div class="feat">

    {% include header.html %}

    <div class="page-header">
        <div class="container">
            <h1>JavaScript</h1>
            <h4>Components to create powerful interfaces</h4>
        </div>
    </div>
</div>

<div class="container docs">
	<div class="row">
	
	    <div class="col-md-2 hidden-xs hidden-sm">
	        <div class="side-bar" id="sideBar">
	
	            <a href="{{ "/getting-started" | prepend: site.baseurl }}"><h4>GETTING STARTED</h4></a>
	            <a href="{{ "/css" | prepend: site.baseurl }}"><h4>CSS</h4></a>
	            <a href="{{ "/javascript" | prepend: site.baseurl }}"><h4 class="active">JAVASCRIPT</h4></a>
	            <ul class="nav nav-list">
	                <li>
	                    <a href="#dialog" rel="{{ site.baseurl }}/demos/dialog/index">Dialog</a>
	                </li>
	                <li>
	                    <a href="#loading" rel="{{ site.baseurl }}/demos/loading/index">Loading</a>
	                </li>
	                <li>
	                    <a href="#notification" rel="{{ site.baseurl }}/demos/notification/index">Notification</a>
	                </li>
	                <li>
	                    <a href="#navigation" rel="{{ site.baseurl }}/demos/navigation/index">Navigation</a>
	                </li>
	                <li>
	                    <a href="#side-menu" rel="{{ site.baseurl }}/demos/side-menu/index">Side Menu</a>
	                </li>
	                <li>
	                    <a href="#dropdown-menu" rel="{{ site.baseurl }}/demos/dropdown-menu/index">DropDown Menu</a>
	                </li>
	                <li>
	                    <a href="#pull-to-refresh" rel="{{ site.baseurl }}/demos/pull-to-refresh/index">Pull to refresh</a>
	                </li>
	                <li>
	                    <a href="#tabbar" rel="{{ site.baseurl }}/demos/tabs/dinamic">TabBar</a>
	                </li>
	                <li>
	                    <a href="#infinite-scroll" rel="{{ site.baseurl }}/demos/infinite-scroll/index">Infinite Scroll</a>
	                </li>
	                <li>
	                    <a href="#shrink-header" rel="{{ site.baseurl }}/demos/shrink-header/index">Shrink Header</a>
	                </li>
	            </ul>
	            <a href="{{ "/examples" | prepend: site.baseurl }}"><h4>EXAMPLES</h4></a>
	        </div>
	    </div>
	
		<div class="col-md-6 col-xs-12">
<!-- DIALOG -->

<section id="dialog" style="padding-top: 0">
    <h3>Dialog</h3>
    <pre><code class="language-javascript">
var dialog = new phonepack.Dialog({
    title: 'Loading...',
    content: 'Message',         
}).show(function(){
    dialog.hide();
});
</code>
</pre>
</section>

<!-- LOADING -->

<section id="loading">
    <h3>Loading</h3>
    <pre><code class="language-javascript">
var loading = new phonepack.Loading({
    spinner: true,
    overlay: true,
    title: 'Loading'
}).show();
                
setTimeout(function() {
    loading.hide();
}, 100);
</code>
</pre>
</section>

<!-- NOTIFICATION -->

<section id="notification">
    <h3>Notification</h3>
    <pre><code class="language-javascript">
var notification = new phonepack.Notification();
notification.simple('simple message');
notification.info('Info message');
notification.success('Success message');
notification.warning('Warning message');
notification.error('Error message');</code></pre>
</section>

<!-- PAGES -->


<section id="navigation">
    <h3>Navigation</h3>

    <pre><code class="language-markup">
&lt;!-- Entry point in views that will be inserted in the DOM  --&gt;
&lt;div id="navigation" class="navigation"&gt;&lt;/div&gt;
    
&lt;!-- All application pages should be between a DIV tag with class " .pages "  --&gt;
&lt;div class="pages"&gt;&lt;/div&gt;
    </code></pre>
    
    <pre><code class="language-javascript">

// Sets the homepage that will be loaded into the DOM.
var options = {
    page: 'startPage.html'
};        

// Instance a new page class
var navigation = new phonepack.Navigation(document.querySelector('.navigation'), options);

// Push a new page into the DOM
navigation.pushPage('example-page.html', { paramObj: { foo: 'bar } }, doSomething);

// Replace a new page in DOM
navigation.changePage('example-page.html', doSomething);

function doSomething(){
    // Callback
}

// Close the current page pushed in the DOM
navigation.closeCurrentPage();

//Get page params
var naviParams = navigation.getParams();
console.log(naviParams.paramObj);

/*
    Output: 
    {
        foo: 'bar'
    }
*/

</code>
</pre>
<br>
<h4>Events</h4>
<h5>beforePush - This method is called before rendering the html of the page in the DOM.</h5>
<pre><code class="language-javascript">
navigation.on('beforePush', function(template, next){
    // template: Html element
    // next: Method should be called for to continue rendering the page in the DOM.
});
</code>
</pre>
<h5>afterPush - This method is called after rendering the html of the page in the DOM.</h5>
<pre><code class="language-javascript">
navigation.on('afterPush', function(template){
    // template: Html element
});
</code>
</pre>
</section>

<!-- PAGES -->

<section id="side-menu">
    <h3>Side Menu</h3>
    <pre><code class="language-javascript">
// Get menu element instance
sideMenu = new phonepack.sideMenu(document.getElementById('side-menu'));

// show/hide menu
sideMenu.toggle();
</code>
</pre>
</section>

<!-- DROPDOWN MENU -->

<section id="dropdown-menu">
    <h3>DropDown Menu</h3>
    <pre><code class="language-javascript">
document.querySelector('#open').addEventListener('click', function() {
    phonepack.DropDownMenu(this, document.getElementById('dropMenu'));
});
</code>
</pre>
</section>

<!-- PULL TO REFRESH -->

<section id="pull-to-refresh">
    <h3>Pull to refresh (only mobile)</h3>
    <pre><code class="language-javascript">
var pullToRefresh = new phonepack.PullToRefresh(document.querySelector('.content'), 
	{ 
		type: 'snake'
	},
	function(){
    setTimeout(function(){
        pullToRefresh.hide();
    }, 5000); 
});
</code> 
</pre>
</section>

<!-- TabBar -->

<section id="tabbar">
    <h3>TabBar</h3>
    <h4>Javascript</h4>
    <pre><code class="language-javascript">
var tabBar = new phonepack.TabBar(document.querySelector('#tab'));
    </code></pre>
    <h4>Html</h4>
    <pre><code class="language-markup">
&lt;div class=&quot;sub-header header--shadow&quot;&gt;
    &lt;div id=&quot;tab&quot; class=&quot;tab-bar bg-indigo tab-bar--text-white tab-bar--indicator-bottom-white&quot;&gt;
      &lt;div class=&quot;tab-bar__item ripple active&quot; ref=&quot;#tab1&quot;&gt;
        TEXT 1
      &lt;/div&gt;
      &lt;div class=&quot;tab-bar__item ripple&quot; ref=&quot;#tab2&quot;&gt;
        TEXT 2
      &lt;/div&gt;
      &lt;div class=&quot;tab-bar__item ripple&quot; ref=&quot;#tab3&quot;&gt;
        TEXT 3
      &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;

  &lt;section class=&quot;content content--padding has-header has-sub-header&quot; id=&quot;tab1&quot;&gt;
      Tab 1
  &lt;/section&gt;
  
  &lt;section class=&quot;content content--padding has-header has-sub-header&quot; id=&quot;tab2&quot;&gt;
      Tab 2
  &lt;/section&gt;
  
  &lt;section class=&quot;content content--padding has-header has-sub-header&quot; id=&quot;tab3&quot;&gt;
      Tab 3
  &lt;/section&gt;
</code>
</pre>
</section>


<!-- InfiniteScroll -->
<section id="infinite-scroll">
    <h3>Infinite Scroll</h3>
    <pre><code class="language-javascript">
var content = document.querySelector('.content');

var infiniteScroll = new phonepack.InfiniteScroll(content, { distance: 50 }, function(){
  infiniteScroll.hide();
});
</code>
</pre>
</section>

<!-- Shrink Header -->
<section id="shrink-header">
    <h3>Shrink Header</h3>
    <pre><code class="language-javascript">
phonepack.shrinkHeader(document.querySelector('.header'));
</code>
</pre>
</section>
		</div>
		
		<div class="col-md-4 hidden-xs hidden-sm">
			{% include device.html %}
		</div>
		
	</div>
</div>
