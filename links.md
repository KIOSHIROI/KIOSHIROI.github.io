---
layout: page
title: 友链
permalink: /links/
---

{% assign total_friends = 0 %}
{% for group in site.data.friends %}
  {% assign total_friends = total_friends | plus: group.items.size %}
{% endfor %}

<section class="friends-page">
  <div class="friends-hero">
    <p class="friends-hero__eyebrow">Link Exchange</p>
    <div class="friends-hero__body">
      <div>
        <p class="friends-hero__lead">
          这里收纳我愿意长期回访的站点。有人写技术，有人写生活，也有人认真维护自己的小角落。
        </p>
        <p class="friends-hero__text">
          我更偏爱持续更新、内容原创、风格稳定的独立博客。友链不是收藏夹，而是一种长期的互相看见。
        </p>
      </div>

      <div class="friends-hero__stats">
        <div class="friends-hero__stat">
          <span class="friends-hero__stat-value">{{ total_friends }}</span>
          <span class="friends-hero__stat-label">站点</span>
        </div>
        <div class="friends-hero__stat">
          <span class="friends-hero__stat-value">{{ site.data.friends.size }}</span>
          <span class="friends-hero__stat-label">分组</span>
        </div>
        <div class="friends-hero__stat">
          <span class="friends-hero__stat-value">长期</span>
          <span class="friends-hero__stat-label">维护</span>
        </div>
      </div>
    </div>
  </div>

  {% for group in site.data.friends %}
    <section class="friend-group">
      <div class="friend-group__header">
        <div>
          <p class="friend-group__eyebrow">{{ group.eyebrow }}</p>
          <h2 class="friend-group__title">{{ group.name }}</h2>
        </div>
        <p class="friend-group__description">{{ group.description }}</p>
      </div>

      <div class="friend-grid">
        {% for item in group.items %}
          <article class="friend-card friend-card--{{ item.tone }}">
            <div class="friend-card__top">
              <span class="friend-card__badge">{{ item.badge }}</span>
              <span class="friend-card__label">{{ item.label }}</span>
            </div>

            <h3 class="friend-card__title">
              <a href="{{ item.url }}" target="_blank" rel="noopener noreferrer">{{ item.title }}</a>
            </h3>
            <p class="friend-card__domain">{{ item.domain }}</p>
            <p class="friend-card__summary">{{ item.summary }}</p>

            <div class="friend-card__tags">
              {% for tag in item.tags %}
                <span class="friend-card__tag">{{ tag }}</span>
              {% endfor %}
            </div>

            <a class="friend-card__action" href="{{ item.url }}" target="_blank" rel="noopener noreferrer">
              访问站点
            </a>
          </article>
        {% endfor %}
      </div>
    </section>
  {% endfor %}

  <section class="friends-apply">
    <div class="friends-apply__main">
      <p class="friends-apply__eyebrow">Apply</p>
      <h2 class="friends-apply__title">想交换友链？</h2>
      <p class="friends-apply__text">
        欢迎通过邮件联系我。通常我会优先添加持续更新、内容原创、可稳定访问的个人博客或独立站点。
      </p>
      <a class="friends-apply__action" href="mailto:{{ site.footer-links.email }}">
        {{ site.footer-links.email }}
      </a>
    </div>

    <div class="friends-apply__aside">
      <div class="friends-apply__rule">1. 站点可稳定访问，内容以原创为主。</div>
      <div class="friends-apply__rule">2. 页面整洁，长期有更新意愿。</div>
      <div class="friends-apply__rule">3. 来信时附上站点名称、地址和一句简介即可。</div>
    </div>
  </section>
</section>
