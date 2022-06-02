function main(args, out, res) {
  // 转换为映射表
  var map = {};
  for (var i in out) {
    var id = out[i].id;
    map[id] = out[i];
  }

  // 更新任务信息
  var status = "已完成";
  var pending = false;
  var jobs = res.Jobs || [];
  for (var i in jobs) {
    job_id = jobs[i].job_id;
    if (map[job_id]) {
      jobs[i]["detail"] = map[job_id];
      var job_status = map[job_id].status;
      switch (job_status) {
        case "failed":
          jobs[i]["result"] = "失败";
          break;
        case "success":
          jobs[i]["result"] = "成功";
          break;
      }
    }

    if (jobs[i]["result"] == "进行中") {
      status = "进行中";
      pending = true;
    }
  }

  return { jobs: jobs, pending: pending, status: status };
}
