## API 地址

地址: https://xii.iqka.com/api

鉴权: 暂时忽略

## 指挥中心

| 名称             | 请求 | 路由                  |
| ---------------- | ---- | --------------------- |
| 数据概览         | GET  | /screen/index/stat    |
| 信创软硬件汇总   | GET  | /screen/index/product |
| 正在适配迁移系统 | GET  | /screen/index/pending |
| 测试成功展示     | GET  | /screen/index/success |
| 信创业务系统类目 | GET  | /screen/index/types   |
| 适配迁移趋势     | GET  | /screen/index/trends  |

## 适配测试

| 名称           | 请求 | 路由                     |
| -------------- | ---- | ------------------------ |
| 数据概览       | GET  | /screen/project/stat     |
| 送测项目数量   | GET  | /screen/project/prepare  |
| 已适配项目数量 | GET  | /screen/project/complete |
| 正在适配项目   | GET  | /screen/project/pending  |
| 报告情况       | GET  | /screen/project/report   |

## 信创成果

| 名称           | 请求 | 路由                   |
| -------------- | ---- | ---------------------- |
| 已适配系统总数 | GET  | /screen/result/total   |
| 已适配系统     | GET  | /screen/result/success |
| 场景分布占比   | GET  | /screen/result/scene   |
| 信创产品       | GET  | /screen/result/product |

## 信创人才

| 名称           | 请求 | 路由                     |
| -------------- | ---- | ------------------------ |
| 数据统计       | GET  | /screen/training/stat    |
| 信创人才数量   | GET  | /screen/training/trainee |
| 信创人才等级   | GET  | /screen/training/level   |
| 信创课程       | GET  | /screen/training/course  |
| 认证考试通过率 | GET  | /screen/training/exam    |

## 平台资源

| 名称         | 请求 | 路由                   |
| ------------ | ---- | ---------------------- |
| 数据摘要     | GET  | /screen/resource/stat  |
| 虚拟机数量   | GET  | /screen/resource/vms   |
| 轻虚拟机数量 | GET  | /screen/resource/lvms  |
| 物理机数量   | GET  | /screen/resource/ms    |
| 资源利用率   | GET  | /screen/resource/usage |
