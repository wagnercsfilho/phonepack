---
layout: default
title: PhonePack - CSS Components
permalink: /css/
---

<div class="feat">

    {% include header.html %}
    
    <div class="page-header">
      <div class="container">
            <h1>
					CSS
				</h1>
				<h4>Design patterns that serve as basic building blocks.</h4>
      </div>
    </div>
</div>
<div class="container docs">
	<div class="row">
		<div class="col-md-2 hidden-xs hidden-sm">
<div class="side-bar" id="sideBar">
	<a href="{{ "/getting-started" | prepend: site.baseurl }}"><h4>GETTING STARTED</h4></a>
	<h4 class="active">CSS</h4>
	<ul class="nav nav-list">
		<li>
			<a href="#header" rel="{{ site.baseurl }}/demos/header/header">Header</a>
			<ul class="nav">
				<li><a href="#header-shadow" rel="{{ site.baseurl }}/demos/header/shadow">With Shadow</a></li>
				<li><a href="#header-colors" rel="{{ site.baseurl }}/demos/header/colors">Custom Colors</a></li>
				<li><a href="#header-buttons" rel="{{ site.baseurl }}/demos/header/buttons">Buttons</a></li>
				<li><a href="#header-caption" rel="{{ site.baseurl }}/demos/header/caption">Caption</a></li>
			</ul>
		</li>
		<li>
			<a href="#content" rel="{{ site.baseurl }}/demos/content/index">Content</a>
			<ul class="nav">
				<li><a href="#content-header" rel="{{ site.baseurl }}/demos/content/header">Header</a></li>
				<li><a href="#content-footer" rel="{{ site.baseurl }}/demos/content/footer">Footer</a></li>
			</ul>
		</li>
		<li>
			<a href="#footer" rel="{{ site.baseurl }}/demos/footer/index">Footer</a>
			<ul class="nav">
				<li><a href="#footer-colors" rel="{{ site.baseurl }}/demos/footer/colors">Custom Colors</a></li>
				<li><a href="#footer-buttons" rel="{{ site.baseurl }}/demos/footer/buttons">Buttons</a></li>
			</ul>
		</li>
		<li>
			<a href="#buttons" rel="{{ site.baseurl }}/demos/buttons/index">Buttons</a>
			<ul class="nav">
				<li><a href="#buttons-colors" rel="{{ site.baseurl }}/demos/buttons/colors">Colors</a></li>
				<li><a href="#buttons-raised" rel="{{ site.baseurl }}/demos/buttons/raised">Raised</a></li>
				<li><a href="#buttons-block" rel="{{ site.baseurl }}/demos/buttons/block">Block</a></li>
				<li><a href="#buttons-flat" rel="{{ site.baseurl }}/demos/buttons/flat">Flat</a></li>
				<li><a href="#buttons-icon" rel="{{ site.baseurl }}/demos/buttons/icon">Icon</a></li>
				<li><a href="#buttons-fab" rel="{{ site.baseurl }}/demos/buttons/fab">Fab</a></li>
				<li><a href="#buttons-floating" rel="{{ site.baseurl }}/demos/buttons/floating">Floating</a></li>
				<li><a href="#buttons-ripple" rel="{{ site.baseurl }}/demos/buttons/ripple">Ripple</a></li>
			</ul>
		</li>
		<li>
			<a href="#lists" rel="{{ site.baseurl }}/demos/lists/index">List</a>
			<ul class="nav">
				<li><a href="#lists-subheader" rel="{{ site.baseurl }}/demos/lists/subheader">Subheader</a></li>
				<li><a href="#lists-caption" rel="{{ site.baseurl }}/demos/lists/caption">Caption</a></li>
				<li><a href="#lists-icon" rel="{{ site.baseurl }}/demos/lists/icon">Icon</a></li>
				<li><a href="#lists-image" rel="{{ site.baseurl }}/demos/lists/image">Image</a></li>
				<li><a href="#lists-ripple" rel="{{ site.baseurl }}/demos/lists/ripple">Ripple Effect</a></li>
			</ul>
		</li>
		<li>
			<a href="#cards" rel="{{ site.baseurl }}/demos/cards/index">Cards</a>
			<ul class="nav">
				<li><a href="#cards-image" rel="{{ site.baseurl }}/demos/cards/image">Image</a></li>
				<li><a href="#cards-avatar" rel="{{ site.baseurl }}/demos/cards/avatar">Avatar</a></li>
				<li><a href="#cards-background-image" rel="{{ site.baseurl }}/demos/cards/background-image">Background Image</a></li>
			</ul>
		</li>
		<li>
			<a href="#text-fields" rel="{{ site.baseurl }}/demos/text-fields/index">Text Fields</a>
			<ul class="nav">
				<li><a href="#text-fields-label" rel="{{ site.baseurl }}/demos/text-fields/label-animate">Label Animate</a></li>
				<li><a href="#text-fields-icon" rel="{{ site.baseurl }}/demos/text-fields/icon">Icon</a></li>
			</ul>
		</li>
		<li>
			<a href="#switch" rel="{{ site.baseurl }}/demos/switch/index">Switch</a>
		</li>
		<li>
			<a href="#checkbox" rel="{{ site.baseurl }}/demos/checkbox/index">Checkbox</a>
		</li>
		<li>
			<a href="#radio" rel="{{ site.baseurl }}/demos/radio/index">Radio Button</a>
		</li>
		<li>
			<a href="#select" rel="{{ site.baseurl }}/demos/select/index">Select</a>
		</li>
		<li>
			<a href="#range" rel="{{ site.baseurl }}/demos/range/index">Range Slider</a>
		</li>
		<li>
			<a href="#tabs" rel="{{ site.baseurl }}/demos/tabs/index">Tabs</a>
			<ul class="nav">
				<li><a href="#tabs-icons" rel="{{ site.baseurl }}/demos/tabs/icons">Icons</a></li>
				<li><a href="#tabs-bottom" rel="{{ site.baseurl }}/demos/tabs/bottom">Bottom</a></li>
			</ul>
		</li>
		<li>
		    <a href="#grid" rel="{{ site.baseurl }}/demos/grid/index">Grid</a>
		    <ul class="nav">
				<li><a href="#grid-padding" rel="{{ site.baseurl }}/demos/grid/padding">Cell Padding</a></li>
				<li><a href="#grid-flex-cell" rel="{{ site.baseurl }}/demos/grid/flex-cell">Flexible Cells</a></li>
				<li><a href="#grid-custom-size" rel="{{ site.baseurl }}/demos/grid/custom-size">Custom Size</a></li>
				<li><a href="#grid-responsive" rel="{{ site.baseurl }}/demos/grid/responsive">Responsive Cells</a></li>
				<li><a href="#grid-alignment" rel="{{ site.baseurl }}/demos/grid/alignment">Alignment</a></li>
				<li><a href="#grid-alignment-cell" rel="{{ site.baseurl }}/demos/grid/alignment-cell">Alignment Cells</a></li>
			</ul>
		</li>
		<li><a href="#colors" rel="{{ site.baseurl }}/demos/colors/index">Colors</a></li>
		<li>
			<a href="#icons" rel="{{ site.baseurl }}/demos/icons/index">Icons</a>
			<ul class="nav">
				<li><a href="#icons-styled" rel="{{ site.baseurl }}/demos/icons/styled">Styled</a></li>
			</ul>
		</li>
	</ul>

	<a href="{{ "/javascript" | prepend: site.baseurl }}"><h4>JAVASCRIPT</h4></a>
	<a href="{{ "/examples" | prepend: site.baseurl }}"><h4>EXAMPLES</h4></a>

</div>
		</div>
	
		<div class="col-md-6 col-xs-12">
<!-- HEADER --> 

<section id="header" style="padding-top: 0">
<h3>Header</h3>
<pre><code class="language-markup">
&lt;header class="header"&gt;
 &lt;div class="header__title"&gt;Header&lt;/div&gt;
&lt;header&gt;</code>
</pre>
</section>

<section id="header-shadow">
    <h3>Header with Shadow</h3>
    <pre><code class="language-markup">
&lt;header class="header header--shadow bg-white"&gt;
    &lt;div class="title"&gt;Header with Shadow&lt;/div&gt;
&lt;header&gt;</code></pre>
</section>

<section id="header-colors">
<h3>Header Custom Colors</h3>
<pre><code class="language-markup">&lt;header class="header header--shadow bg-blue text-white"&gt;
 &lt;div class="header__title"&gt;Header Colors&lt;/div&gt;
&lt;header&gt;</code></pre>
</section>

<section id="header-buttons">
<h3>Header with Buttons</h3>
<pre><code class="language-markup">
&lt;header class="header header--shadow bg-lime text-black"&gt;
  	&lt;div class="header__buttons"&gt;
		&lt;button class="button button--icon button--ripple text-white"&gt;
			&lt;i class="icon material-icons">menu&lt;/i&gt;
		&lt;/button&gt;
	&lt;/div&gt;
    &lt;div class="header__title">Header Buttons&lt;/div&gt;
    &lt;div class="header__buttons"&gt;
		&lt;a class="button button--icon button--ripple"&gt;
			&lt;i class="material-icons">search&lt;/i&gt;
		&lt;/a&gt;
	&lt;/div&gt;
&lt;header&gt;</code>
</pre>
</section>

<section id="header-caption">
<h3>Header Caption</h3>
<pre><code class="language-markup">
&lt;header class="header header--shadow header--caption"&gt;
 &lt;div class="header__title"&gt;
    Header
    &lt;div class="header__caption"&gt;header caption&lt;/div&gt;
 &lt;/div&gt;
&lt;header&gt;</code>
</pre>
</section>

<!-- /HEADER --> 

<!-- CONTENT --> 

<section id="content">
<h3>Content</h3>
<pre><code class="language-markup">&lt;section class="content content--padding"&gt;
  &lt;h1&gt;Main Content&lt;/h1&gt;
&lt;/section&gt;</code></pre>
</section>

<section id="content-header">
<h3>Content + Header</h3>
<pre><code class="language-markup">&lt;section class="content content--padding has-header"&gt;
  &lt;h1&gt;Content with header&lt;/h1&gt;
&lt;/section&gt;</code></pre>
</section>

<section id="content-footer">
<h3>Content + Footer</h3>
<pre><code class="language-markup">&lt;section class="content content--padding has-header has-footer"&gt;
  &lt;h1&gt;Content with footer&lt;/h1&gt;
&lt;/section&gt;</code></pre>
</section>

<!-- /CONTENT --> 

<!-- FOOTER --> 

<section id="footer">
<h3>Footer</h3>
<pre><code class="language-markup">&lt;footer class="footer"&gt;
 &lt;div class="title"&gt;Footer&lt;/div&gt;
&lt;footer&gt;</code></pre>
</section>

<section id="footer-colors">
<h3>Footer Colors</h3>
<pre><code class="language-markup">&lt;footer class="footer bg-yellow text-black"&gt;
 &lt;div class="footer__title"&gt;Footer Colors&lt;/div&gt;
&lt;footer&gt;</code></pre>
</section>

<section id="footer-buttons">
<h3>Footer Buttons</h3>
<pre><code class="language-markup">&lt;footer class="footer bg-yellow text-black"&gt;
&lt;div class="footer__buttons"&gt;
    &lt;button class="button button--icon button--ripple text-black"&gt;
	    &lt;i class="icon material-icons">menu&lt;/i&gt;
    &lt;/button&gt;
&lt;/div&gt;
 &lt;div class="title"&gt;Buttons&lt;/div&gt;
&lt;footer&gt;</code></pre>
</section>

<!-- /FOOTER --> 

<!-- BUTTONS --> 
<section id="buttons">
<h3>Buttons</h3>
<pre><code class="language-markup">
&lt;button class="button button--raised bg-blue text-white"&gt;Button&lt;/button&gt;
&lt;button class="button button--raised bg-red text-white"&gt;Button&lt;/button&gt;
&lt;button class="button button--raised bg-green text-white"&gt;Button&lt;/button&gt;</code></pre>
</section>

<section id="buttons-size">
<h3>Different Sizes</h3>
<pre><code class="language-markup">
&lt;button class="button button--small button--raised bg-blue text-white"&gt;Button&lt;/button&gt;
&lt;button class="button button--raised bg-red text-white"&gt;Button&lt;/button&gt;
&lt;button class="button button--large button--raised bg-green text-white"&gt;Button&lt;/button&gt;</code></pre>
</section>

<section id="buttons-colors">
<h3>Colors Button</h3>
<pre><code class="language-markup">
&lt;button class="button button--raised bg-blue text-white"&gt;Button&lt;/button&gt;
&lt;button class="button button--raised bg-red text-white"&gt;Button&lt;/button&gt;
&lt;button class="button button--raised bg-green text-white"&gt;Button&lt;/button&gt;</code></pre>
</section>

<section id="buttons-raised">
<h3>Raised Buttons</h3>
<pre><code class="language-markup">
&lt;button class="button button--raised bg-blue text-white"&gt;Button&lt;/button&gt;
&lt;button class="button button--raised bg-red text-white"&gt;Button&lt;/button&gt;
&lt;button class="button button--raised bg-green text-white"&gt;Button&lt;/button&gt;</code></pre>
</section>


<section id="buttons-block">
<h3>Full Width Block Buttons</h3>
<pre><code class="language-markup">
&lt;button class="button button--raised button--block bg-blue text-white"&gt;Button&lt;/button&gt;
&lt;button class="button button--raised button--block bg-red text-white"&gt;Button&lt;/button&gt;
&lt;button class="button button--raised button--block bg-green text-white"&gt;Button&lt;/button&gt;</code></pre>
</section>

<section id="buttons-flat">
<h3>Flat Buttons</h3>
<pre><code class="language-markup">
&lt;button class="button button--flat button--block text-blue"&gt;Button&lt;/button&gt;
&lt;button class="button button--flat button--block text-red"&gt;Button&lt;/button&gt;</code></pre>
</section>

<section id="buttons-icon">
<h3>Icon Buttons</h3>
<pre><code class="language-markup">
&lt;button class="button button--icon bg-blue text-white"&gt;Button&lt;/button&gt;
&lt;button class="button button--icon bg-red text-white"&gt;Button&lt;/button&gt;
&lt;button class="button button--icon bg-green text-white"&gt;Button&lt;/button&gt;</code></pre>
</section>

<section id="buttons-fab">
<h3>Fab Buttons</h3>
<pre><code class="language-markup">
&lt;button class="button button--raised button--block bg-blue text-white"&gt;Button&lt;/button&gt;
&lt;button class="button button--raised button--block bg-red text-white"&gt;Button&lt;/button&gt;
&lt;button class="button button--raised button--block bg-green text-white"&gt;Button&lt;/button&gt;</code></pre>
</section>

<section id="buttons-floating">
<h3>Floating Buttons</h3>
<pre><code class="language-markup">
&lt;button class="button button--raised button--floating bg-blue text-white"&gt;Button&lt;/button&gt;</code></pre>
</section>

<section id="buttons-ripple">
<h3>Ripple Effect</h3>
<pre><code class="language-markup">
&lt;button class="button button--raised button--ripple bg-blue text-white"&gt;Button&lt;/button&gt;</code></pre>
</section>
<!-- /BUTTONS --> 

<!-- LISTS --> 
<section id="lists">			
<h3>Lists</h3>
<pre><code class="language-markup">
&lt;ul class="list"&gt;
  &lt;li class="list__item"&gt;Html5&lt;/li&gt;
  &lt;li class="list__item"&gt;PHP&lt;/li&gt;
  &lt;li class="list__item"&gt;NodeJS&lt;/li&gt;
  &lt;li class="list__item"&gt;Ruby&lt;/li&gt;
  &lt;li class="list__item"&gt;JavaScript&lt;/li&gt;
  &lt;li class="list__item"&gt;Java&lt;/li&gt;
&lt;ul&gt;
</code></pre>
</section>

<section id="lists-subheader">
<h3>Lists Subheader</h3>
<pre><code class="language-markup">
&lt;ul class="list"&gt;
    &lt;li class="list__subheader"&gt;Front-end&lt;/li&gt;
	&lt;li class="list__item"&gt;Html5&lt;/li&gt;
    &lt;li class="list__item"&gt;CSS&lt;/li&gt;
    &lt;li class="list__item"&gt;JavaScript&lt;/li&gt;
    &lt;li class="list__subheader"&gt;Back-end&lt;/li&gt;
    &lt;li class="list__item"&gt;Java&lt;/li&gt;
    &lt;li class="list__item"&gt;NodeJS&lt;/li&gt;
    &lt;li class="list__item"&gt;PHP&lt;/li&gt;
    &lt;li class="list__item"&gt;Ruby&lt;/li&gt;
&lt;ul&gt;
</code></pre>
</section>

<section id="lists-caption">			
<h3>List Caption</h3>
<pre><code class="language-markup">
&lt;ul class=&quot;list&quot;&gt;
 &lt;li class=&quot;list__subheader&quot;&gt;Chat&lt;/li&gt;
 &lt;li class=&quot;list__item&quot;&gt; 
     &lt;div class=&quot;list__primary&quot;&gt;
        &lt;img src=&quot;http://lorempixel.com/60/60/people/1&quot; width=&quot;40&quot; height=&quot;40&quot; class=&quot;img-circle&quot;&gt;
     &lt;/div&gt;
     &lt;div class=&quot;list__content&quot;&gt; 
         Fred 
         &lt;div class=&quot;list__caption&quot;&gt;
         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
         &lt;/div&gt; 
     &lt;/div&gt;
 &lt;/li&gt;
 &lt;li class=&quot;list__item&quot;&gt; 
     &lt;div class=&quot;list__primary&quot;&gt;
        &lt;img src=&quot;http://lorempixel.com/60/60/people/2&quot; width=&quot;40&quot; height=&quot;40&quot; class=&quot;img-circle&quot;&gt;
     &lt;/div&gt;
     &lt;div class=&quot;list__content&quot;&gt; 
         Lisa 
         &lt;div class=&quot;list__caption&quot;&gt;
         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
         &lt;/div&gt; 
     &lt;/div&gt;
 &lt;/li&gt;
 &lt;li class=&quot;list__item&quot;&gt; 
     &lt;div class=&quot;list__primary&quot;&gt;
        &lt;img src=&quot;http://lorempixel.com/60/60/people/3&quot; width=&quot;40&quot; height=&quot;40&quot; class=&quot;img-circle&quot;&gt;
     &lt;/div&gt;
     &lt;div class=&quot;list__content&quot;&gt; 
         John
         &lt;div class=&quot;list__caption&quot;&gt;
         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
         &lt;/div&gt; 
     &lt;/div&gt;
 &lt;/li&gt;
&lt;ul&gt;
</code></pre>
</section>

<section id="lists-icon">			
<h3>Lists Icon</h3>
<pre><code class="language-markup">
&lt;ul class=&quot;list&quot;&gt;
 &lt;li class=&quot;list__subheader&quot;&gt;Icon left&lt;/li&gt;
 &lt;li class=&quot;list__item&quot;&gt; 
    &lt;div class=&quot;list__primary&quot;&gt;
        &lt;i class=&quot;icon mdi mdi-inbox&quot;&gt;&lt;/i&gt;
    &lt;/div&gt;
    &lt;div class=&quot;list__content&quot;&gt;Inbox&lt;/div&gt;
 &lt;/li&gt;
 
 &lt;li class=&quot;list__item&quot;&gt; 
    &lt;div class=&quot;list__primary&quot;&gt;
        &lt;i class=&quot;icon mdi mdi-star-circle&quot;&gt;&lt;/i&gt;
    &lt;/div&gt;
    &lt;div class=&quot;list__content&quot;&gt;Starred&lt;/div&gt;
 &lt;/li&gt;
 
 &lt;div class=&quot;list__divider list__divider--pushed&quot;&gt;&lt;/div&gt;
 &lt;div class=&quot;list__subheader list__subheader--pushed&quot;&gt;Icon Circled&lt;/div&gt;
 
 &lt;li class=&quot;list__item&quot;&gt; 
     &lt;div class=&quot;list__primary&quot;&gt;
        &lt;i class=&quot;icon icon--circled bg-green color-white mdi mdi-inbox&quot;&gt;&lt;/i&gt;
     &lt;/div&gt;
     &lt;div class=&quot;list__content&quot;&gt; All mail &lt;/div&gt;
 &lt;/li&gt;
 
 &lt;li class=&quot;list__item&quot;&gt; 
     &lt;div class=&quot;list__primary&quot;&gt;
        &lt;i class=&quot;icon icon--circled bg-red color-white mdi mdi-delete&quot;&gt;&lt;/i&gt;
     &lt;/div&gt;
     &lt;div class=&quot;list__content&quot;&gt; Trash &lt;/div&gt;
 &lt;/li&gt;
 &lt;div class=&quot;list__divider list__divider--pushed&quot;&gt;&lt;/div&gt;
 &lt;div class=&quot;list__subheader list__subheader--pushed&quot;&gt;Icon Right&lt;/div&gt;
 
 &lt;li class=&quot;list__item&quot;&gt; 
     &lt;div class=&quot;list__primary&quot;&gt;
        &lt;i class=&quot;icon icon--circled bg-grey color-white mdi mdi-inbox&quot;&gt;&lt;/i&gt;
     &lt;/div&gt;
     &lt;div class=&quot;list__content&quot;&gt; Inbox &lt;/div&gt;
     &lt;div class=&quot;list__secondary&quot;&gt;
        &lt;i class=&quot;icon color-grey mdi mdi-information-outline&quot;&gt;&lt;/i&gt;
     &lt;/div&gt;
 &lt;/li&gt;
 
 &lt;li class=&quot;list__item&quot;&gt; 
     &lt;div class=&quot;list__primary&quot;&gt;
        &lt;i class=&quot;icon icon--circled bg-grey color-white mdi mdi-delete&quot;&gt;&lt;/i&gt;
     &lt;/div&gt;
     &lt;div class=&quot;list__content&quot;&gt; Trash &lt;/div&gt;
     &lt;div class=&quot;list__secondary&quot;&gt;
        &lt;i class=&quot;icon color-grey mdi mdi-information-outline&quot;&gt;&lt;/i&gt;
     &lt;/div&gt;
 &lt;/li&gt;
&lt;ul&gt;
</code></pre>
</section>

<section id="lists-image">			
<h3>Lists Image</h3>
<pre><code class="language-markup">
&lt;ul class=&quot;list&quot;&gt;
 &lt;li class=&quot;list__subheader&quot;&gt;Contacts&lt;/li&gt;
 &lt;li class=&quot;list__item list__item--separator-pushed&quot;&gt; 
     &lt;div class=&quot;list__primary&quot;&gt;
        &lt;img src=&quot;http://lorempixel.com/60/60/people/1&quot; width=&quot;40&quot; height=&quot;40&quot; class=&quot;img-circle&quot;&gt;
     &lt;/div&gt;
     &lt;div class=&quot;list__content&quot;&gt; Fred &lt;/div&gt;
     &lt;div class=&quot;list__secondary&quot;&gt;
        &lt;i class=&quot;icon mdi mdi-phone text-grey&quot;&gt;&lt;/i&gt;
     &lt;/div&gt;
 &lt;/li&gt;
 &lt;li class=&quot;list__item list__item--separator-pushed&quot;&gt; 
     &lt;div class=&quot;list__primary&quot;&gt;
        &lt;img src=&quot;http://lorempixel.com/60/60/people/2&quot; width=&quot;40&quot; height=&quot;40&quot; class=&quot;img-circle&quot;&gt;
     &lt;/div&gt;
     &lt;div class=&quot;list__content&quot;&gt; Lisa &lt;/div&gt;
     &lt;div class=&quot;list__secondary&quot;&gt;
        &lt;i class=&quot;icon mdi mdi-phone text-grey&quot;&gt;&lt;/i&gt;
     &lt;/div&gt;
 &lt;/li&gt;
 &lt;li class=&quot;list__item list__item--separator-pushed&quot;&gt; 
     &lt;div class=&quot;list__primary&quot;&gt;
        &lt;img src=&quot;http://lorempixel.com/60/60/people/3&quot; width=&quot;40&quot; height=&quot;40&quot; class=&quot;img-circle&quot;&gt;
     &lt;/div&gt;
     &lt;div class=&quot;list__content&quot;&gt; John&lt;/div&gt;
     &lt;div class=&quot;list__secondary&quot;&gt;
        &lt;i class=&quot;icon mdi mdi-phone text-grey&quot;&gt;&lt;/i&gt;
     &lt;/div&gt;
 &lt;/li&gt;
 
 &lt;li class=&quot;list__separator&quot;&gt;&lt;/li&gt;
 &lt;li class=&quot;list__subheader&quot;&gt;Favorites&lt;/li&gt;
 &lt;li class=&quot;list__item list__item--separator-pushed&quot;&gt; 
     &lt;div class=&quot;list__primary&quot;&gt;
        &lt;img src=&quot;http://lorempixel.com/60/60/people/5&quot; width=&quot;40&quot; height=&quot;40&quot; class=&quot;img-circle&quot;&gt;
     &lt;/div&gt;
     &lt;div class=&quot;list__content&quot;&gt; Brad &lt;/div&gt;
     &lt;div class=&quot;list__secondary&quot;&gt;
        &lt;i class=&quot;icon mdi mdi-phone text-grey&quot;&gt;&lt;/i&gt;
     &lt;/div&gt;
 &lt;/li&gt;
 &lt;li class=&quot;list__item list__item--separator-pushed&quot;&gt; 
     &lt;div class=&quot;list__primary&quot;&gt;
        &lt;img src=&quot;http://lorempixel.com/60/60/people/6&quot; width=&quot;40&quot; height=&quot;40&quot; class=&quot;img-circle&quot;&gt;
     &lt;/div&gt;
     &lt;div class=&quot;list__content&quot;&gt; Will &lt;/div&gt;
     &lt;div class=&quot;list__secondary&quot;&gt;
        &lt;i class=&quot;icon mdi mdi-phone text-grey&quot;&gt;&lt;/i&gt;
     &lt;/div&gt;
 &lt;/li&gt;
 &lt;li class=&quot;list__item list__item--separator-pushed&quot;&gt; 
     &lt;div class=&quot;list__primary&quot;&gt;
        &lt;img src=&quot;http://lorempixel.com/60/60/people/4&quot; width=&quot;40&quot; height=&quot;40&quot; class=&quot;img-circle&quot;&gt;
     &lt;/div&gt;
     &lt;div class=&quot;list__content&quot;&gt; Item 01 &lt;/div&gt;
     &lt;div class=&quot;list__secondary&quot;&gt;
        &lt;i class=&quot;icon mdi mdi-phone text-grey&quot;&gt;&lt;/i&gt;
     &lt;/div&gt;
 &lt;/li&gt;
 
 &lt;ul&gt;
</code></pre>
</section>

<section id="lists-ripple">			
<h3>Lists Ripple Effect</h3>
<pre><code class="language-markup">
&lt;ul class=&quot;list&quot;&gt;
 &lt;li class=&quot;list__item list__item--separator-pushed ripple&quot;&gt; 
     &lt;div class=&quot;list__primary&quot;&gt;
        &lt;img src=&quot;http://lorempixel.com/60/60/people/1&quot; width=&quot;40&quot; height=&quot;40&quot; class=&quot;img-circle&quot;&gt;
     &lt;/div&gt;
     &lt;div class=&quot;list__content&quot;&gt; Fred &lt;/div&gt;
 &lt;/li&gt;
 &lt;ul&gt;
</code></pre>
</section>
<!-- /LISTS --> 

<!-- CARDS --> 
<section id="cards">      
<h3>Cards</h3>
<pre><code class="language-markup">
&lt;div class="list card"&gt;
 &lt;div class="list__item card__text"&gt;
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Mauris sagittis pellentesque lacus eleifend lacinia...
 &lt;/div&gt;
&lt;/div&gt;
</code></pre>
</section>

<section id="cards-image">      
<h3>Cards</h3>
<pre><code class="language-markup">
&lt;div class="list card"&gt;
 &lt;div class="list__item card__image"&gt;
  &lt;img src="http://lorempixel.com/640/480/abstract/" class="card__image--pic"&gt;
  &lt;h2 class="card__image--title"&gt;Welcome&lt;/h2&gt;
  &lt;div class="card__image--menu"&gt;
    &lt;button class="button button--icon button--ripple"&gt;
     &lt;i class="icon material-icons"&gt;share&lt;/i&gt;
    &lt;/button&gt;
  &lt;/div&gt;
 &lt;/div&gt;
 &lt;div class="list__item card__text"&gt;
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Mauris sagittis pellentesque lacus eleifend lacinia...
 &lt;/div&gt;
 &lt;div class="list__item card__actions"&gt;
  &lt;button class="button button--flat button--ripple color-blue"&gt;GET STARTED&lt;/button&gt;
 &lt;/div&gt;
&lt;/div&gt;
</code></pre>
</section>

<section id="cards-avatar">      
<h3>Card Avatar</h3>
<pre><code class="language-markup">
&lt;div class=&quot;list card&quot;&gt;
 &lt;div class=&quot;list__item card__avatar&quot;&gt;
     &lt;div class=&quot;list_primary&quot;&gt;
        &lt;img ng-src=&quot;http://lorempixel.com/50/50/people&quot; class=&quot;img-circle&quot;&gt;&lt;/img&gt;
     &lt;/div&gt;
     &lt;div class=&quot;list_content&quot;&gt;
        Alice Maria
     &lt;/div&gt;
 &lt;/div&gt;
 &lt;div class=&quot;list__item card__image&quot;&gt;
     &lt;img src=&quot;http://lorempixel.com/640/480/food/&quot; class=&quot;card__image--pic&quot;&gt;
     &lt;h2 class=&quot;card__image--title&quot;&gt;Welcome&lt;/h2&gt;
     &lt;div class=&quot;card__image--menu&quot;&gt;
         &lt;button class=&quot;button button--icon button--ripple&quot;&gt;
            &lt;i class=&quot;icon material-icons&quot;&gt;share&lt;/i&gt;
         &lt;/button&gt;
     &lt;/div&gt;
 &lt;/div&gt;
 &lt;div class=&quot;list__item card__text&quot;&gt;
 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 Mauris sagittis pellentesque lacus eleifend lacinia...
 &lt;/div&gt;
 &lt;div class=&quot;list__item card__actions&quot;&gt;
     &lt;button class=&quot;button button--flat button--ripple text-blue&quot;&gt;LIKE&lt;/button&gt;
     &lt;button class=&quot;button button--flat button--ripple text-blue&quot;&gt;SHARED&lt;/button&gt;
 &lt;/div&gt;
&lt;/div&gt;
</code></pre>
</section>

<section id="cards-background-image">      
<h3>Background Image</h3>
<pre><code class="language-markup">
&lt;div class="card" style="background: url('http://lorempixel.com/640/480/people/')"&gt;
 &lt;div class="list__item card__title"&gt;
    &lt;h2 class="card__title--text"&gt;Welcome&lt;/h2&gt;
 &lt;/div&gt;
 &lt;div class="card__text"&gt;
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Mauris sagittis pellentesque lacus eleifend lacinia...
 &lt;/div&gt;
 &lt;div class="card__actions"&gt;
  &lt;button class="button button--flat button--ripple color-blue"&gt;GET STARTED&lt;/button&gt;
 &lt;/div&gt;
&lt;/div&gt;
</code></pre>
</section>
<!-- CARDS --> 

<!-- TEXT FIELD --> 
<section id="text-fields">
<h3>Text Field</h3>
<pre><code class="language-markup">&lt;div class="text-field"&gt;
  &lt;input type="text" class="text-field__input" placeholder="Last name"&gt;
  &lt;div class="text-field__border"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
</section>

<section id="text-fields-label">
<h3>Label Animate</h3>
<pre><code class="language-markup">&lt;div class="text-field"&gt;
  &lt;input type="text" class="text-field__input" placeholder="Last name"&gt;
  &lt;div class="text-field__border"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
</section>

<section id="text-fields-icon">
<h3>Text Icon</h3>
<pre><code class="language-markup">&lt;div class="text-field"&gt;
  &lt;input type="text" class="text-field__input" placeholder="Last name"&gt;
  &lt;div class="text-field__border"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
</section>
<!-- TEXT FIELD --> 

<section id="switch">
<h3 >Switch</h3>
<pre><code class="language-markup">&lt;div class="switch"&gt;
    &lt;input type="checkbox" id="switch1" class="switch__input"&gt;
    &lt;label for="switch1" class="switch__label">Switch&lt;/label&gt;
&lt;/div&gt;

&lt;div class="switch"&gt;
    &lt;input type="checkbox" id="switch2" class="switch__input" checked&gt;
    &lt;label for="switch2" class="switch__label">Switch with help&lt;/label&gt;
    &lt;span class="switch__help">Lorem ipsum dolor sit amet.&lt;/span&gt;
&lt;/div&gt;

&lt;div class="switch"&gt;
    &lt;input type="checkbox" id="switch3" class="switch__input" disabled&gt;
    &lt;label for="switch3" class="switch__label">Switch disabled&lt;/label&gt;
&lt;/div&gt;

&lt;div class="switch"&gt;
    &lt;input type="checkbox" id="switch4" class="switch__input" disabled checked&gt;
    &lt;label for="switch4" class="switch__label"&gt;Checked and disabled&lt;/label&gt;
&lt;/div&gt;</code></pre>
</section>

<section id="checkbox">
<h3>Checkbox</h3>
<pre><code class="language-markup">&lt;div class="checkbox"&gt;
    &lt;input type="checkbox" id="checkbox1" class="checkbox__input"&gt;
    &lt;label for="checkbox1" class="checkbox__label">Checkbox&lt;/label&gt;
&lt;/div&gt;

&lt;div class="checkbox"&gt;
    &lt;input type="checkbox" id="checkbox3" class="checkbox__input" disabled=""&gt;
    &lt;label for="checkbox3" class="checkbox__label">Checkbox disabled&lt;/label&gt;
    &lt;span class="checkbox__help">Lorem ipsum dolor sit amet.&lt;/span&gt;
&lt;/div&gt;

&lt;div class="checkbox checkbox--standalone">
    &lt;input type="checkbox" id="checkbox5" class="checkbox__input"&gt;
    &lt;label for="checkbox5" class="checkbox__label">&lt;/label&gt;
&lt;/div&gt;</code></pre>
</section>

<section id="radio">
<h3>Radio Button</h3>
<pre><code class="language-markup">
&lt;div class="radio-group"&gt;

	&lt;div class="radio-button"&gt;
   		&lt;input type="radio" id="radio1" name="radio1" class="radio-button__input"&gt;
    	 &lt;label for="radio1" class="radio-button__label">Radio Button 1&lt;/label&gt;
    &lt;/div&gt;

 	&lt;div class="radio-button"&gt;
   		&lt;input type="radio" id="radio2" name="radio1" class="radio-button__input"&gt;
     	&lt;label for="radio2" class="radio-button__label">Radio Button 2&lt;/label&gt;
     	&lt;span class="radio-button__help">Lorem ipsum dolor sit amet.&lt;/span&gt;
 	&lt;/div&gt;
 	
&lt;/div&gt;

&lt;div class="radio-button"&gt;
    &lt;input type="radio" id="radio3" class="radio-button__input" disabled&gt;
    &lt;label for="radio3" class="radio-button__label">Radio disabled&lt;/label&gt;
&lt;/div>

&lt;div class="radio-button"&gt;
    &lt;input type="radio" id="radio4" class="radio-button__input" disabled checked&gt;
    &lt;label for="radio4" class="radio-button__label">Radio checked and disabled&lt;/label&gt;
&lt;/div&gt;
</code></pre>
</section>

<section id="select">
<h3>Select</h3>
<pre><code class="language-markup">
&lt;div class="select"&gt;
  &lt;label class="select__label"&gt;&lt;/label&gt;
  &lt;select class="select__input"&gt;
  	&lt;option&gt;&lt;/option&gt;
  &lt;/select&gt;
  &lt;div class="select__border"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
</section>

<section id="range">
<h3>Range Slider</h3>
<pre><code class="language-markup">
&lt;div class="range"&gt;
  &lt;input type="range"&gt;&lt;/label&gt;
&lt;/div&gt;</code></pre>
</section>

<section id="tabs">
<h3>Tabs</h3>
<pre><code class="language-markup">
&lt;div class=&quot;sub-header header--shadow&quot;&gt;
    &lt;div class=&quot;tab-bar bg-indigo tab-bar--text-white tab-bar--indicator-bottom-white&quot;&gt;
      &lt;div class=&quot;tab-bar__item ripple active&quot;&gt;
        TEXT 1
      &lt;/div&gt;
      &lt;div class=&quot;tab-bar__item ripple&quot;&gt;
        TEXT 2
      &lt;/div&gt;
      &lt;div class=&quot;tab-bar__item ripple&quot;&gt;
        TEXT 3
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;</code></pre>
</section>

<section id="tabs-icons">
<h3>Tabs Icons</h3>
<pre><code class="language-markup">
&lt;div class=&quot;sub-header header--shadow&quot;&gt;
    &lt;div class=&quot;tab-bar bg-indigo tab-bar--text-white tab-bar--indicator-bottom-white&quot;&gt;
      &lt;div class=&quot;tab-bar__item ripple active&quot;&gt;
        &lt;i class=&quot;icon mdi mdi-home&quot;&gt;&lt;/i&gt;
      &lt;/div&gt;
      &lt;div class=&quot;tab-bar__item ripple&quot;&gt;
        &lt;i class=&quot;icon mdi mdi-comment&quot;&gt;&lt;/i&gt;
      &lt;/div&gt;
      &lt;div class=&quot;tab-bar__item ripple&quot;&gt;
        &lt;i class=&quot;icon mdi mdi-bell-outline&quot;&gt;&lt;/i&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;</code></pre>
</section>

<section id="tabs-bottom">
<h3>Tabs Bottom</h3>
<pre><code class="language-markup">
&lt;div class=&quot;footer&quot;&gt;
    &lt;div class=&quot;tab-bar bg-white tab-bar--text-black tab-bar--indicator-top-black&quot;&gt;
      &lt;div class=&quot;tab-bar__item ripple active&quot;&gt;
        &lt;i class=&quot;icon mdi mdi-home&quot;&gt;&lt;/i&gt;
      &lt;/div&gt;
      &lt;div class=&quot;tab-bar__item ripple&quot;&gt;
        &lt;i class=&quot;icon mdi mdi-comment&quot;&gt;&lt;/i&gt;
      &lt;/div&gt;
      &lt;div class=&quot;tab-bar__item ripple&quot;&gt;
        &lt;i class=&quot;icon mdi mdi-bell-outline&quot;&gt;&lt;/i&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;</code></pre>
</section>

<section id="grid">
<h3>Grid</h3>
<p>The grid cells naturally space themselves equally and expand to fit the entire row. </p>
<pre><code class="language-markup">
&lt;div class="row"&gt;
            &lt;div class="cell"&gt;
                &lt;div class="Demo"&gt;.cell&lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="cell"&gt;
                &lt;div class="Demo"&gt;.cell&lt;/div&gt;
            &lt;/div&gt;
&lt;/div&gt;</code></pre>
</section>

<section id="grid-padding">
<h3>Cell Padding</h3>
<pre><code class="language-markup">
&lt;div class="row row--gutters"&gt;
            &lt;div class="cell"&gt;
                &lt;div class="Demo"&gt;.cell&lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="cell"&gt;
                &lt;div class="Demo"&gt;.cell&lt;/div&gt;
            &lt;/div&gt;
&lt;/div&gt;</code></pre>
</section>

<section id="grid-flex-cell">
<h3>Flexible Cells</h3>
<pre><code class="language-markup">
&lt;div class=&quot;row row--gutters row--flex-cells&quot;&gt;
            &lt;div class=&quot;cell&quot;&gt;
                &lt;div class=&quot;Demo&quot;&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis velit non gravida venenatis..&lt;/div&gt;
            &lt;/div&gt;
            &lt;div class=&quot;cell&quot;&gt;
                &lt;div class=&quot;Demo&quot;&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis velit non gravida venenatis. Praesent consequat lectus purus, ut scelerisque velit condimentum eu. Maecenas sagittis ante ut turpis varius interdum. Quisque tellus
                    ipsum, eleifend non ipsum id, suscipit ultricies neque.&lt;/div&gt;
            &lt;/div&gt;
&lt;/div&gt;</code></pre>
</section>

<section id="grid-custom-size">
<h3>Custom Size</h3>
<pre><code class="language-markup">
&lt;div class="row row--gutters"&gt;
            &lt;div class="cell cell--2"&gt;
                &lt;div class="Demo"&gt;.cell--2&lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="cell cell--2"&gt;
                &lt;div class="Demo"&gt;.cell--2&lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="cell cell--8"&gt;
                &lt;div class="Demo"&gt;.cell--8&lt;/div&gt;
            &lt;/div&gt;
&lt;/div&gt;</code></pre>
</section>

<section id="grid-responsive">
<h3>Responsive Cells</h3>
<pre><code class="language-markup">
&lt;div class="row row--gutters row--full row--responsive"&gt;
            &lt;div class="cell"&gt;
                &lt;div class="Demo"&gt;Cell Responsive&lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="cell"&gt;
                &lt;div class="Demo"&gt;Cell Responsive&lt;/div&gt;
            &lt;/div&gt;
&lt;/div&gt;</code></pre>
</section>

<section id="grid-alignment">
<h3>Alignment</h3>
<pre><code class="language-markup">
&lt;p&gt;Align Top&lt;/p&gt;
        &lt;div class=&quot;row row--gutters row--top&quot;&gt;
            &lt;div class=&quot;cell&quot;&gt;
                &lt;div class=&quot;Demo&quot;&gt;.cell&lt;/div&gt;
            &lt;/div&gt;
            &lt;div class=&quot;cell&quot;&gt;
                &lt;div class=&quot;Demo&quot;&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis velit non gravida venenatis. Praesent consequat lectus purus, ut scelerisque velit condimentum eu.&lt;/div&gt;
            &lt;/div&gt;
            &lt;div class=&quot;cell&quot;&gt;
                &lt;div class=&quot;Demo&quot;&gt;.cell&lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;h4&gt;Align Bottom&lt;/h4&gt;
        &lt;div class=&quot;row row--gutters row--bottom&quot;&gt;
            &lt;div class=&quot;cell&quot;&gt;
                &lt;div class=&quot;Demo&quot;&gt;.cell&lt;/div&gt;
            &lt;/div&gt;
            &lt;div class=&quot;cell&quot;&gt;
                &lt;div class=&quot;Demo&quot;&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis velit non gravida venenatis. Praesent consequat lectus purus, ut scelerisque velit condimentum eu.&lt;/div&gt;
            &lt;/div&gt;
            &lt;div class=&quot;cell&quot;&gt;
                &lt;div class=&quot;Demo&quot;&gt;.cell&lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;h4&gt;Align Center&lt;/h4&gt;
        &lt;div class=&quot;row row--gutters row--center&quot;&gt;
            &lt;div class=&quot;cell&quot;&gt;
                &lt;div class=&quot;Demo&quot;&gt;.cell&lt;/div&gt;
            &lt;/div&gt;
            &lt;div class=&quot;cell&quot;&gt;
                &lt;div class=&quot;Demo&quot;&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis velit non gravida venenatis. Praesent consequat lectus purus, ut scelerisque velit condimentum eu.&lt;/div&gt;
            &lt;/div&gt;
&lt;/div&gt;</code></pre>
</section>

<section id="grid-alignment-cell">
<h3>Alignment Cells</h3>
<pre><code class="language-markup">
&lt;div class=&quot;row row--gutters&quot;&gt;
            &lt;div class=&quot;cell cell--top&quot;&gt;
                &lt;div class=&quot;Demo&quot;&gt;.cell&lt;/div&gt;
            &lt;/div&gt;
            &lt;div class=&quot;cell&quot;&gt;
                &lt;div class=&quot;Demo&quot;&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&lt;/div&gt;
            &lt;/div&gt;
            &lt;div class=&quot;cell cell--center&quot;&gt;
                &lt;div class=&quot;Demo&quot;&gt;.cell&lt;/div&gt;
            &lt;/div&gt;
            &lt;div class=&quot;cell cell--bottom&quot;&gt;
                &lt;div class=&quot;Demo&quot;&gt;.cell&lt;/div&gt;
            &lt;/div&gt;
&lt;/div&gt;</code></pre>
</section>

<section id="colors">
<h3>Colors</h3>
<pre><code class="language-markup">
&lt;ul class=&quot;list&quot;&gt;
    &lt;li class=&quot;list__item&quot;&gt;
        &lt;div class=&quot;list__content text-red&quot;&gt;.text-red&lt;/div&gt;
        &lt;div class=&quot;list__secondary bg-red text-white&quot; style=&quot;padding: 4px;&quot;&gt;
            .bg-red
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;
        &lt;div class=&quot;list__content text-pink&quot;&gt;.text-pink&lt;/div&gt;
        &lt;div class=&quot;list__secondary bg-pink text-white&quot; style=&quot;padding: 4px;&quot;&gt;
            .bg-pink
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;
        &lt;div class=&quot;list__content text-purple&quot;&gt;.text-purple&lt;/div&gt;
        &lt;div class=&quot;list__secondary bg-purple text-white&quot; style=&quot;padding: 4px;&quot;&gt;
            .bg-purple
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;
        &lt;div class=&quot;list__content text-deep-purple&quot;&gt;.deep-purple&lt;/div&gt;
        &lt;div class=&quot;list__secondary bg-deep-purple text-white&quot; style=&quot;padding: 4px;&quot;&gt;
            .bg-deep-purple
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;
        &lt;div class=&quot;list__content text-indigo&quot;&gt;.text-indigo&lt;/div&gt;
        &lt;div class=&quot;list__secondary bg-indigo text-white&quot; style=&quot;padding: 4px;&quot;&gt;
            .bg-indigo
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;
        &lt;div class=&quot;list__content text-blue&quot;&gt;.text-blue&lt;/div&gt;
        &lt;div class=&quot;list__secondary bg-blue text-white&quot; style=&quot;padding: 4px;&quot;&gt;
            .bg-blue
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;
        &lt;div class=&quot;list__content text-light-blue&quot;&gt;.text-light-blue&lt;/div&gt;
        &lt;div class=&quot;list__secondary bg-light-blue text-white&quot; style=&quot;padding: 4px;&quot;&gt;
            .bg-light-blue
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;
        &lt;div class=&quot;list__content text-cyan&quot;&gt;.text-cyan&lt;/div&gt;
        &lt;div class=&quot;list__secondary bg-cyan text-white&quot; style=&quot;padding: 4px;&quot;&gt;
            .bg-cyan
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;
        &lt;div class=&quot;list__content text-teal&quot;&gt;.text-teal&lt;/div&gt;
        &lt;div class=&quot;list__secondary bg-teal text-white&quot; style=&quot;padding: 4px;&quot;&gt;
            .bg-teal
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;
        &lt;div class=&quot;list__content text-green&quot;&gt;.text-green&lt;/div&gt;
        &lt;div class=&quot;list__secondary bg-green text-white&quot; style=&quot;padding: 4px;&quot;&gt;
            .bg-green
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;
        &lt;div class=&quot;list__content text-light-green&quot;&gt;.text-light-green&lt;/div&gt;
        &lt;div class=&quot;list__secondary bg-light-green text-white&quot; style=&quot;padding: 4px;&quot;&gt;
            .bg-light-green
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;
        &lt;div class=&quot;list__content text-lime&quot;&gt;.text-lime&lt;/div&gt;
        &lt;div class=&quot;list__secondary bg-lime text-white&quot; style=&quot;padding: 4px;&quot;&gt;
            .bg-lime
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;
        &lt;div class=&quot;list__content text-yellow&quot;&gt;.text-yellow&lt;/div&gt;
        &lt;div class=&quot;list__secondary bg-yellow text-white&quot; style=&quot;padding: 4px;&quot;&gt;
            .bg-yellow
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;
        &lt;div class=&quot;list__content text-amber&quot;&gt;.text-amber&lt;/div&gt;
        &lt;div class=&quot;list__secondary bg-amber text-white&quot; style=&quot;padding: 4px;&quot;&gt;
            .bg-amber
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;
        &lt;div class=&quot;list__content text-orange&quot;&gt;.text-orange&lt;/div&gt;
        &lt;div class=&quot;list__secondary bg-orange text-white&quot; style=&quot;padding: 4px;&quot;&gt;
            .bg-orange
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;
        &lt;div class=&quot;list__content text-deep-orange&quot;&gt;.text-deep-orange&lt;/div&gt;
        &lt;div class=&quot;list__secondary bg-deep-orange text-white&quot; style=&quot;padding: 4px;&quot;&gt;
            .bg-deep-orange
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;
        &lt;div class=&quot;list__content text-brown&quot;&gt;.text-brown&lt;/div&gt;
        &lt;div class=&quot;list__secondary bg-brown text-white&quot; style=&quot;padding: 4px;&quot;&gt;
            .bg-brown
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;
        &lt;div class=&quot;list__content text-grey&quot;&gt;.text-grey&lt;/div&gt;
        &lt;div class=&quot;list__secondary bg-grey text-white&quot; style=&quot;padding: 4px;&quot;&gt;
            .bg-grey
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;
        &lt;div class=&quot;list__content text-blue-grey&quot;&gt;.text-blue-grey&lt;/div&gt;
        &lt;div class=&quot;list__secondary bg-blue-grey text-white&quot; style=&quot;padding: 4px;&quot;&gt;
            .bg-blue-grey
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;
        &lt;div class=&quot;list__content text-black&quot;&gt;.text-black&lt;/div&gt;
        &lt;div class=&quot;list__secondary bg-black text-white&quot; style=&quot;padding: 4px;&quot;&gt;
            .bg-black
        &lt;/div&gt;
    &lt;/li&gt;
    &lt;li class=&quot;list__item&quot;&gt;
        &lt;div class=&quot;list__content text-black&quot;&gt;.text-white&lt;/div&gt;
        &lt;div class=&quot;list__secondary bg-white text-black&quot; style=&quot;padding: 4px;&quot;&gt;
            .bg-white
        &lt;/div&gt;
    &lt;/li&gt;
&lt;/ul&gt;</code></pre>
</section>

<section id="icons">
<h3>Icons</h3>
<p>
<h4>PhonePack provide Material Design iconic font based on <a href="https://materialdesignicons.com/" target="_blanck">Austin Andrews work.</a>
Simple icons</h4>
<p>Simply use mdi class with mdi-{icon} modifier to display icon.
<a href="https://materialdesignicons.com/" target="_blanck">You can get icon labels here.</a></p>
</p>
<pre><code class="language-markup">
&lt;i class=&quot;icon mdi mdi-basket&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;icon mdi mdi-account&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;icon mdi mdi-account-box-outline&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;icon mdi mdi-apps&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;icon mdi mdi-basket&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;icon mdi mdi-beaker-empty-outline&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;icon mdi mdi-camcorder&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;icon mdi mdi-cast&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;icon mdi mdi-comment-outline&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;icon mdi mdi-earth&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;icon mdi mdi-heart-outline&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;icon mdi mdi-phone&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;icon mdi mdi-bluetooth&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;icon mdi mdi-cart&quot;&gt;&lt;/i&gt;
&lt;i class=&quot;icon mdi mdi-thumb-up&quot;&gt;&lt;/i&gt;</code></pre>
</section>

<section id="icons-styled">
<h3>Styled Icons</h3>
<pre><code class="language-markup">
&lt;i class=&quot;icon text-red mdi mdi-basket&quot;&gt;&lt;/i&gt; 
&lt;i class=&quot;icon text-blue mdi mdi-basket&quot;&gt;&lt;/i&gt; 
&lt;i class=&quot;icon text-green mdi mdi-basket&quot;&gt;&lt;/i&gt; 
&lt;i class=&quot;icon text-yellow mdi mdi-basket&quot;&gt;&lt;/i&gt; 
&lt;i class=&quot;icon text-purple mdi mdi-basket&quot;&gt;&lt;/i&gt; 
&lt;i class=&quot;icon icon--circled bg-red mdi mdi-account&quot;&gt;&lt;/i&gt; 
&lt;i class=&quot;icon icon--circled bg-blue mdi mdi-account&quot;&gt;&lt;/i&gt; 
&lt;i class=&quot;icon icon--circled bg-green mdi mdi-account&quot;&gt;&lt;/i&gt; 
&lt;i class=&quot;icon icon--circled bg-yellow mdi mdi-account&quot;&gt;&lt;/i&gt; 
&lt;i class=&quot;icon icon--circled bg-purple mdi mdi-account&quot;&gt;&lt;/i&gt; </code></pre>
</section>
		</div>
		
		<div class="col-md-4 hidden-xs hidden-sm">
			{% include device.html %}
		</div>
		
	</div>
</div>

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
		                
		        });
		});
    </script>