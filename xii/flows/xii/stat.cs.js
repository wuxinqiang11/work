function main(args, out, result) {
  var data = out.data;
  var res = {
    主机: {
      总数: data.normal_nodes - data.system_nodes,
      在线: data.health_nodes,
      离线: data.maintaining_nodes,
    },
    容器: {
      总数: data.containers,
      在线: data.running_containers,
      离线: data.containers - data.running_containers,
    },
    资源利用率: (
      (data.total_memory_used / data.total_memory_size) *
      100
    ).toFixed(2),
  };

  return res;
}
