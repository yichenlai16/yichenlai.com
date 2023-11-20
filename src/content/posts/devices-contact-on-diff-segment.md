---
title: 解決裝置位於不同網段無法連線問題
pubDate: 2023-10-20
description: 在不同網段之下可以互相連線時，偶然發現小米物聯網裝置無法跟不同網段的裝置溝通，利用SNAT來偽裝封包來源IP即可解決
author: Yichen Lai
image: 
url: ""
alt: ""
tags:
  - IOT
  - NAT
---

## 設備清單

- **Router:** `10.0.0.1`
- **Switch0:** `10.0.0.1/24`
- **VLAN 107 (switch0.107):** `10.0.107.1/24`
- **小米裝置:** `10.0.107.100`
- **Home Assistant:** `10.0.0.100`

近期家中新設的小米裝置無法和Home Assistant對接，發現原因是Home Assistant與小米裝置位於不同的網段，根據[hyf635269547](https://github.com/hyf635269547)在[hass-xiaomi-miot/issues/1267](https://github.com/hyf635269547/hass-xiaomi-miot/issues/1267)中的提到：

> 小米禁止非同網段的使用本地模式，如果路由器支持源地址NAT，可將HASS的源地址NAT為和小米同一網段

它們的源IP（Source IP）和目標IP（Destination IP）位於同一網段才能讓Home Assistant (Source) 與小米裝置 (Destination) 可以連線。

這時可以用 **SNAT（Source Network Address Translation）** 技術，將Home Assistant的源IP地址改成像小米裝置所在的網段，以符合小米的要求。

SNAT可以改變封包中的源IP地址，讓Home Assistant的通訊看起來像來自於與小米相同的網段。

SNAT設定如下

根據 Edge OS 配置，SNAT 設定如下：

- **Source Address:** Home Assistant 的源 IP 地址
- Destination Address: 小米裝置的IP
- **Outbound Interface:** switch0
- **Protocol:** All（所有協議）
- Translation Type: Masquerade

這樣能讓 Home Assistant 的連線看起來是跟小米一樣的網段了