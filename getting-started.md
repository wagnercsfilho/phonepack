---
layout: default
title: PhonePack - Getting Started
permalink: /getting-started/
---

<div class="feat">

    {% include header.html %}
    
    <div class="page-header">
      <div class="container">
      				<h1>Getting started</h1>
      			<h4>Once you've downloaded PhonePack, here's what to do next.</h4>
      </div>
    </div>
</div>

<div class="container">
  <div class="row">
  
    <div class="col-md-2 hidden-xs hidden-sm">
      <div class="side-bar" id="sideBar">

        <a href="{{ "/getting-started" | prepend: site.baseurl }}"><h4 class="active">GETTING STARTED</h4></a>
        <a href="{{ "/css" | prepend: site.baseurl }}"><h4>CSS</h4></a>
        <a href="{{ "/javascript" | prepend: site.baseurl }}"><h4>JAVASCRIPT</h4></a>
        <a href="{{ "/examples" | prepend: site.baseurl }}"><h4>EXAMPLES</h4></a>
      </div>
    </div>
 
    <div class="col-md-8 col-xs-12">

    <div class="row row-content">
      <div class="col-md-12">
        <h2 class="subtitle">Download via Bower</h2>
        <p>PhonePack is available through Bower</p>
        <pre><code class="language-markup">bower install phonepack</code></pre>
      </div>
    </div>
    <div class="row row-content">
          <div class="col-md-12">
        <h2 class="subtitle">Don’t use bower?</h2>
        <p>PhonePack is available via download</p>
        <a class="btn btn-large btn-primary" href="https://github.com/wagnercsfilho/phonepack/archive/master.zip">Download Phonepack</a>
        <span>Currently v0.0.1 BETA</span>
      </div>
    </div>
    <div class="row row-content">
      <div class="col-md-12">
          <h2 class="subtitle">Include files</h2>
            <p>All needed files are in the dist folder.
            You can include PhonePack files in your html page.</p>
  <pre><code class="language-markup">&lt;link rel="stylesheet" type="text/css" href="phonepack.css"&gt;
&lt;script src="phonepack.js" type="text/javascript" charset="utf-8"&gt;&lt;/script&gt;</code></pre>
      </div>
    </div>
    <div class="row row-content">
  	  <div class="col-md-12">
  	  <h2 class="subtitle">Basic template</h2>
      <p>Use this basic template to get your app started.</p>
<pre><code class="language-markup">
&lt;!DOCTYPE html&gt;
  &lt;html&gt;
      &lt;head&gt;
        &lt;meta charset="utf-8"&gt;
        
        &lt;!-- Sets initial viewport load and disables zooming  --&gt;
        &lt;meta name="viewport" content="width=device-width, user-scalable=no"&gt;
        &lt;title&gt;PhonePack&lt;/title&gt;
  
        &lt;!-- PhonePack CSS  --&gt;
        &lt;link rel="stylesheet" type="text/css" href="phonepack.css"&gt;
  
        &lt;!-- PhonePack JavaScript  --&gt;
        &lt;script src="phonepack.js" type="text/javascript" charset="utf-8"&gt;&lt;/script&gt;
      &lt;/head&gt;
  &lt;body&gt;
  
    &lt;header class="header header--shadow bg-lime "&gt;
      &lt;div class="header__title"&gt;PhonePack&lt;/div&gt;
    &lt;/header&gt;
  
    &lt;section class="content has-header"&gt;
      &lt;ul class="list"&gt;
          &lt;li class="list__item"&gt;
            &lt;div class="list__content"&gt;
              List item 01
              &lt;div class="list__caption"&gt;
                Caption Item
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/li&gt;
        &lt;/ul&gt;
      &lt;/section&gt;
  
&lt;/body&gt;
&lt;/html&gt;</code></pre>

  	  </div>
  	 </div>
  
  </div>
 </div>
</div>