const qs = (sel, el = document) => el.querySelector(sel)
const qsa = (sel, el = document) => Array.from(el.querySelectorAll(sel))

const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return fallback
      return JSON.parse(raw)
    } catch {
      return fallback
    }
  },
  set(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
  },
}

const todayYmd = () => {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

const fmtTs = (ts) => {
  const d = new Date(ts)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  const hh = String(d.getHours()).padStart(2, "0")
  const mm = String(d.getMinutes()).padStart(2, "0")
  return `${y}-${m}-${day} ${hh}:${mm}`
}

const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

const I18N = {
  "app.title": { zh: "康复助手", hmn: "Tus Pab Rov Qab Zog" },
  "app.subtitle": {
    zh: "柔和简洁 · 字体偏大 · 操作简单\n（数据保存在本机浏览器）",
    hmn: "Yooj yim thiab muag muag · Ntawv loj · Siv tau yooj yim\n(Cov ntaub ntawv khaws hauv lub browser)",
  },
  "lang.both": { zh: "双语\n中+苗", hmn: "Ob\nZh+Hmn" },
  "lang.zh": { zh: "中文\n仅", hmn: "Suav\nxwb" },
  "lang.hmn": { zh: "苗语\n仅", hmn: "Hmoob\nxwb" },

  "nav.guide": { zh: "训练指南", hmn: "Qhia\nKev qoj" },
  "nav.checkin": { zh: "每日打卡", hmn: "Sau\nHnub no" },
  "nav.supervise": { zh: "动态监督", hmn: "Saib\nKev nce" },
  "nav.metrics": { zh: "指标监测", hmn: "Ntsuas\nKev mob" },
  "nav.care": { zh: "饮食心理", hmn: "Noj\n& Siab" },

  "guide.title": { zh: "分阶段康复训练指南", hmn: "Qhia kev rov qab zog (faib theem)" },
  "guide.desc": {
    zh: "按“卧床期→恢复期→行走准备期”循序渐进。疼痛明显、头晕胸闷或血压异常时，请先休息并联系医生/家属。",
    hmn: "Ua raws “pw saum txaj → rov qab → npaj taug kev” qeeb qeeb. Yog mob ntau, kiv taub hau, ncoo hauv siab, los ntshav siab tsis zoo, so thiab hu kws kho mob/txiv neej.",
  },
  "guide.stageTitle": { zh: "选择阶段", hmn: "Xaiv theem" },

  "stage.bed": { zh: "卧床期", hmn: "Pw saum txaj" },
  "stage.recovery": { zh: "恢复期", hmn: "Rov qab" },
  "stage.walk": { zh: "行走准备期", hmn: "Npaj taug kev" },

  "stage.bed.h": { zh: "卧床期（保护+激活）", hmn: "Pw saum txaj (tiv thaiv + qhib zog)" },
  "stage.bed.p": {
    zh: "目标：防血栓、护关节、唤醒肌力。每天多次、每次短一点。",
    hmn: "Lub hom phiaj: tiv thaiv ntshav khov, saib xyuas pob qij txha, qhib leeg zog. Ua ntau zaus tab sis luv luv.",
  },
  "stage.recovery.h": { zh: "恢复期（力量+平衡）", hmn: "Rov qab (zog + sib npaug)" },
  "stage.recovery.p": {
    zh: "目标：增强肌力、改善活动度、建立站立平衡。循序渐进，量力而行。",
    hmn: "Lub hom phiaj: ntxiv leeg zog, txhim kho txav tau, kawm sawv sib npaug. Ua qeeb qeeb, raws li koj lub peev xwm.",
  },
  "stage.walk.h": { zh: "行走准备期（步态+耐力）", hmn: "Npaj taug kev (kev taug + ua ntev)" },
  "stage.walk.p": {
    zh: "目标：安全行走、提升耐力、回归日常。优先保证姿势正确与安全。",
    hmn: "Lub hom phiaj: taug kev muaj kev nyab xeeb, ntxiv ua ntev, rov qab rau lub neej niaj hnub. Ua kom qauv zoo thiab nyab xeeb ua ntej.",
  },

  "video.title": { zh: "康复教学视频", hmn: "Daim video qhia kev qoj" },
  "video.desc": {
    zh: "可粘贴视频链接（如医院教学视频/云盘直链），保存后在此嵌入播放。",
    hmn: "Koj tuaj yeem muab link video (xws li tsev kho mob qhia/ txuas ncaj), khaws ces tso saib ntawm no.",
  },
  "video.urlLabel": { zh: "视频链接", hmn: "Link video" },
  "video.save": { zh: "保存链接", hmn: "Khaws link" },
  "video.empty": { zh: "未设置视频链接。请先填写并保存。", hmn: "Tsis tau teeb link video. Thov sau thiab khaws ua ntej." },
  "video.playHint": { zh: "如无法播放，请更换可直接访问的链接或使用本地文件。", hmn: "Yog ua si tsis tau, hloov mus link uas nkag tau ncaj qha los yog siv ntaub ntawv hauv koj lub tshuab." },

  "checkin.title": { zh: "每日康复打卡", hmn: "Sau hnub no (qoj rov qab)" },
  "checkin.desc": {
    zh: "每天记录一次训练完成情况，可重复保存同一天以更新内容。",
    hmn: "Sau ib zaug ib hnub. Koj tuaj yeem khaws dua hnub ntawd los hloov ntaub ntawv.",
  },
  "checkin.historyTitle": { zh: "打卡记录", hmn: "Keeb kwm sau" },

  "field.date": { zh: "日期", hmn: "Hnub tim" },
  "field.stage": { zh: "阶段", hmn: "Theem" },
  "field.exercises": { zh: "训练项目（可多选）", hmn: "Yam qoj (xaiv ntau tau)" },
  "field.minutes": { zh: "训练时长（分钟，可选）", hmn: "Ntev npaum li cas (feeb, xaiv tau)" },
  "field.pain": { zh: "疼痛评分（0-10，可选）", hmn: "Qhov mob (0-10, xaiv tau)" },
  "hint.pain": { zh: "0=不痛，10=非常痛。", hmn: "0=tsis mob, 10=mob heev." },
  "field.mood": { zh: "今日心情（可选）", hmn: "Hnub no siab zoo li cas (xaiv tau)" },
  "field.note": { zh: "备注（可选）", hmn: "Nqe lus ntxiv (xaiv tau)" },
  "placeholder.note": { zh: "例如：今天有点累，改为分两次完成。", hmn: "Piv txwv: hnub no nkees me ntsis, faib ua ob zaug." },

  "mood.good": { zh: "不错", hmn: "Zoo" },
  "mood.ok": { zh: "一般", hmn: "Ib yam" },
  "mood.bad": { zh: "不太好", hmn: "Tsis zoo" },

  "action.saveCheckin": { zh: "保存打卡", hmn: "Khaws sau" },
  "action.clearForm": { zh: "清空表单", hmn: "Rho tawm daim ntawv" },
  "action.edit": { zh: "编辑", hmn: "Hloov" },
  "action.delete": { zh: "删除", hmn: "Rho tawm" },
  "action.refresh": { zh: "刷新提醒", hmn: "Rov tshiab" },
  "action.saveMetrics": { zh: "保存指标", hmn: "Khaws ntsuas" },

  "supervise.title": { zh: "康复动态监督区", hmn: "Thaj chaw saib kev nce (rov qab)" },
  "supervise.desc": {
    zh: "自动汇总打卡进度，并给出温和提醒。仅作辅助，不替代医生建议。",
    hmn: "Sau ua ke koj cov sau thiab qhia nco qab me me. Qhov no yog pab xwb, tsis hloov kws kho mob cov lus.",
  },
  "supervise.statsTitle": { zh: "进度概览", hmn: "Saib tag nrho" },
  "supervise.remindTitle": { zh: "今日提醒", hmn: "Nco hnub no" },
  "supervise.timelineTitle": { zh: "近期记录", hmn: "Sau tsis ntev no" },
  "stat.totalDays": { zh: "已打卡天数", hmn: "Hnub tau sau" },
  "stat.streak": { zh: "连续天数", hmn: "Ntxiv txuas" },
  "stat.lastCheckin": { zh: "最近一次", hmn: "Zaum kawg" },

  "metrics.title": { zh: "指标监测", hmn: "Ntsuas (BP/ntshav qab zib/ntshav rog)" },
  "metrics.desc": {
    zh: "记录血压/血糖/血脂，便于观察趋势。若数值异常或不适，请及时就医。",
    hmn: "Sau ntshav siab/ntshav qab zib/ntshav rog kom pom kev hloov. Yog tsis zoo los yog tsis xis, mus cuag kws kho mob.",
  },
  "metrics.bp": { zh: "血压（mmHg）", hmn: "Ntshav siab (mmHg)" },
  "placeholder.systolic": { zh: "收缩压 例如 120", hmn: "Siab (systolic) xws li 120" },
  "placeholder.diastolic": { zh: "舒张压 例如 80", hmn: "Qis (diastolic) xws li 80" },
  "hint.bp": { zh: "输入两项即可（可留空）。", hmn: "Sau ob tus lej xwb (tso khoob tau)." },
  "metrics.glucose": { zh: "血糖（mmol/L，可选）", hmn: "Ntshav qab zib (mmol/L, xaiv tau)" },
  "placeholder.glucose": { zh: "例如 5.6", hmn: "xws li 5.6" },
  "metrics.lipids": { zh: "血脂（mmol/L，可选）", hmn: "Ntshav rog (mmol/L, xaiv tau)" },
  "placeholder.tc": { zh: "总胆固醇 TC", hmn: "TC tag nrho" },
  "placeholder.tg": { zh: "甘油三酯 TG", hmn: "TG" },
  "placeholder.ldl": { zh: "低密度 LDL", hmn: "LDL" },
  "hint.lipids": { zh: "可只填你有的项目。", hmn: "Koj muaj dab tsi ces sau xwb." },
  "metrics.latestTitle": { zh: "最近一次指标", hmn: "Ntsuas zaum kawg" },
  "metrics.trendTitle": { zh: "简易趋势", hmn: "Kev hloov yooj yim" },
  "metrics.historyTitle": { zh: "历史记录", hmn: "Keeb kwm" },
  "metrics.tableDate": { zh: "时间", hmn: "Sij hawm" },
  "metrics.tableBp": { zh: "血压", hmn: "Ntshav siab" },
  "metrics.tableOther": { zh: "血糖/血脂", hmn: "Qab zib/rog" },

  "care.title": { zh: "低盐低脂饮食建议与心理关怀", hmn: "Qhia noj (tsawg ntsev/tsawg rog) & saib siab" },
  "care.desc": {
    zh: "以清淡为主，规律作息，保持好心情。可由家属协助记录与提醒。",
    hmn: "Noj kom nyias (tsawg ntsev), pw raws sij hawm, khaws siab zoo. Tsev neeg pab sau thiab nco tau.",
  },
  "care.dietTitle": { zh: "饮食建议", hmn: "Qhia noj" },
  "care.mindTitle": { zh: "心理关怀", hmn: "Saib siab" },
}

const DIET_ITEMS = [
  {
    zh: "每天盐≤5g：少放盐、酱油、咸菜、腌制品。",
    hmn: "Ntsev ≤5g ib hnub: txo ntsev, kua txob, zaub qhuav, zaub qab ntsev.",
  },
  {
    zh: "少油少炸：多蒸煮炖，少油炸与肥肉。",
    hmn: "Tswg roj thiab tsis kib: ntau ua kub/siav, txo kib thiab nqaij rog.",
  },
  {
    zh: "优选蛋白：鱼、瘦肉、豆制品、鸡蛋适量。",
    hmn: "Xaiv protein zoo: ntses, nqaij nyias, taum, qe me me.",
  },
  { zh: "多蔬菜水果：每天至少 500g 蔬菜。", hmn: "Noj zaub ntau: tsawg kawg 500g zaub ib hnub." },
  { zh: "控糖控酒：少甜饮，尽量不喝酒。", hmn: "Tswj qab zib thiab cawv: txo dej qab zib, zoo tshaj tsis haus cawv." },
  { zh: "足量饮水：少量多次，听从医生限制。", hmn: "Haus dej txaus: haus me me ntau zaus, raws kws kho mob hais." },
]

const MIND_ITEMS = [
  { zh: "每天给自己一句鼓励：我在变好。", hmn: "Txhua hnub hais ib lo lus txhawb: Kuv tab tom zoo dua." },
  { zh: "训练分小目标：一次做一点点，也算完成。", hmn: "Faib ua lub hom phiaj me: ua me me los tseem suav." },
  { zh: "和家人聊聊：说出担心与需要。", hmn: "Sib tham nrog tsev neeg: hais koj qhov kev txhawj thiab qhov koj xav tau." },
  { zh: "保持规律作息：按时睡、按时起。", hmn: "Pw raws sij hawm: pw thiab sawv raws sijhawm." },
  { zh: "放松练习：慢吸气 4 秒，呼气 6 秒，重复 5 次。", hmn: "Ntsiag to: nqus pa 4 vib nas this, tso pa 6 vib, ua 5 zaug." },
  { zh: "若持续失眠/焦虑/情绪低落，请寻求专业帮助。", hmn: "Yog pw tsis tsaug zog/ntshai/siab nqes ntev, nrhiav kev pab kws tshaj lij." },
]

const STAGES = [
  {
    id: "bed",
    titleKey: "stage.bed.h",
    descKey: "stage.bed.p",
    steps: [
      {
        zh: "踝泵运动：脚尖上下勾 20 次 × 3 组。",
        hmn: "Qoj ko taw: rub ntiv taw siab/qis 20 zaug × 3 pawg.",
      },
      {
        zh: "股四头肌等长收缩：绷紧大腿前侧 5 秒 × 10 次。",
        hmn: "Ceg leeg tuav: nruj ceg pem hauv ntej 5 vib × 10 zaug.",
      },
      {
        zh: "深呼吸+咳嗽训练：慢吸慢呼，必要时轻咳排痰。",
        hmn: "Nqus pa tob + hnoos: nqus/tshem pa qeeb, xav tau ces hnoos me me.",
      },
      {
        zh: "肩颈轻柔活动：缓慢转头、耸肩，各 10 次。",
        hmn: "Qoj caj dab/pej xeem: tig taub hau qeeb, co xub pwg 10 zaug.",
      },
    ],
  },
  {
    id: "recovery",
    titleKey: "stage.recovery.h",
    descKey: "stage.recovery.p",
    steps: [
      {
        zh: "坐位抬膝：坐稳后抬膝 10 次 × 2 组。",
        hmn: "Zaum tsa hauv caug: zaum ruaj ces tsa 10 zaug × 2 pawg.",
      },
      {
        zh: "站立重心转移：扶稳后左右移重心 10 次。",
        hmn: "Sawv hloov hnyav: tuav ruaj ces hloov sab xis/sab laug 10 zaug.",
      },
      {
        zh: "小腿后侧拉伸：每次 15 秒 × 3 次。",
        hmn: "Rub leeg nram ceg: 15 vib × 3 zaug.",
      },
      {
        zh: "上肢力量：握力球或弹力带轻拉 10 次 × 2 组。",
        hmn: "Zog tes: tuav pob los yog rub hlua elastic 10 zaug × 2 pawg.",
      },
    ],
  },
  {
    id: "walk",
    titleKey: "stage.walk.h",
    descKey: "stage.walk.p",
    steps: [
      {
        zh: "原地踏步：扶稳后慢踏 30-60 秒。",
        hmn: "Taug kauj ruam hauv chaw: tuav ruaj ces taug 30-60 vib nas this.",
      },
      {
        zh: "抬脚尖/抬脚跟：各 10 次 × 2 组。",
        hmn: "Tsa ntiv taw/tsa luj taw: txhua 10 zaug × 2 pawg.",
      },
      {
        zh: "短距离行走：室内 3-5 分钟，注意休息。",
        hmn: "Taug luv: hauv tsev 3-5 feeb, nco so.",
      },
      {
        zh: "步态提示：抬头、收腹、步子小一点，先稳再快。",
        hmn: "Qhia taug kev: tsa taub hau, tuav plab, kauj ruam me, ruaj ua ntej ces nrawm.",
      },
    ],
  },
]

const EXERCISES = {
  bed: [
    { id: "ankle", zh: "踝泵运动", hmn: "Qoj ko taw" },
    { id: "quad", zh: "股四头肌收缩", hmn: "Ceg leeg tuav" },
    { id: "breath", zh: "深呼吸训练", hmn: "Nqus pa tob" },
    { id: "neck", zh: "肩颈活动", hmn: "Qoj caj dab/xub pwg" },
  ],
  recovery: [
    { id: "kneeUp", zh: "坐位抬膝", hmn: "Zaum tsa hauv caug" },
    { id: "shift", zh: "站立重心转移", hmn: "Sawv hloov hnyav" },
    { id: "stretch", zh: "小腿拉伸", hmn: "Rub leeg nram ceg" },
    { id: "arm", zh: "上肢力量训练", hmn: "Qoj tes zog" },
  ],
  walk: [
    { id: "march", zh: "原地踏步", hmn: "Taug hauv chaw" },
    { id: "toeHeel", zh: "抬脚尖/脚跟", hmn: "Tsa ntiv/lauj taw" },
    { id: "walkShort", zh: "短距离行走", hmn: "Taug luv" },
    { id: "gait", zh: "步态纠正提示", hmn: "Qhia taug kev" },
  ],
}

let langMode = store.get("rehab.langMode", "both")
let activePanel = store.get("rehab.activePanel", "guide")
let activeStage = store.get("rehab.activeStage", "bed")

const t = (key) => I18N[key] || { zh: key, hmn: key }

const renderText = (el, obj) => {
  if (!el) return
  if (langMode === "zh") el.textContent = obj.zh ?? ""
  else if (langMode === "hmn") el.textContent = obj.hmn ?? ""
  else el.textContent = `${obj.zh ?? ""}\n${obj.hmn ?? ""}`.trim()
}

const applyTranslations = () => {
  document.documentElement.lang = langMode === "zh" ? "zh-CN" : "en"
  qsa("[data-i18n]").forEach((el) => renderText(el, t(el.dataset.i18n)))
  qsa("[data-i18n-placeholder]").forEach((el) => {
    const obj = t(el.dataset.i18nPlaceholder)
    const val = langMode === "zh" ? obj.zh : langMode === "hmn" ? obj.hmn : `${obj.zh}\n${obj.hmn}`.trim()
    el.setAttribute("placeholder", val)
  })
}

const toast = (() => {
  let timer = null
  return (keyOrObj) => {
    const el = qs("#toast")
    const obj = typeof keyOrObj === "string" ? t(keyOrObj) : keyOrObj
    renderText(el, obj)
    el.classList.add("is-show")
    if (timer) window.clearTimeout(timer)
    timer = window.setTimeout(() => el.classList.remove("is-show"), 1700)
  }
})()

const setLangMode = (mode) => {
  langMode = mode
  store.set("rehab.langMode", langMode)
  qsa(".seg").forEach((b) => b.setAttribute("aria-pressed", b.dataset.langmode === mode ? "true" : "false"))
  applyTranslations()
  renderStage()
  renderExerciseList()
  renderCheckinHistory()
  renderSupervise()
  renderMetrics()
  renderCareLists()
}

const setActivePanel = (panel) => {
  activePanel = panel
  store.set("rehab.activePanel", activePanel)
  qsa(".panel").forEach((p) => p.classList.toggle("is-active", p.dataset.panel === panel))
  qsa(".nav__btn").forEach((b) => b.classList.toggle("is-active", b.dataset.target === panel))
}

const setActiveStage = (stage) => {
  activeStage = stage
  store.set("rehab.activeStage", activeStage)
  qsa(".chip").forEach((b) => {
    const on = b.dataset.stage === stage
    b.classList.toggle("is-active", on)
    b.setAttribute("aria-selected", on ? "true" : "false")
  })
  renderStage()
}

const getVideoUrls = () => store.get("rehab.videoUrls", {})
const setVideoUrl = (stageId, url) => {
  const all = getVideoUrls()
  all[stageId] = url
  store.set("rehab.videoUrls", all)
}

const renderStage = () => {
  const stage = STAGES.find((s) => s.id === activeStage) || STAGES[0]
  const box = qs("#stage-content")
  const urls = getVideoUrls()
  const url = (urls[stage.id] || "").trim()
  box.innerHTML = ""

  const card = document.createElement("div")
  card.className = "stage-card"

  const h = document.createElement("div")
  h.className = "stage-card__h"
  renderText(h, t(stage.titleKey))

  const p = document.createElement("div")
  p.className = "stage-card__p"
  renderText(p, t(stage.descKey))

  const steps = document.createElement("div")
  steps.className = "stage-card__p"
  const stepLines = stage.steps
    .map((s, idx) => ({
      zh: `${idx + 1}. ${s.zh}`,
      hmn: `${idx + 1}. ${s.hmn}`,
    }))
    .reduce(
      (acc, cur) => ({ zh: `${acc.zh}\n${cur.zh}`.trim(), hmn: `${acc.hmn}\n${cur.hmn}`.trim() }),
      { zh: "", hmn: "" },
    )
  renderText(steps, stepLines)

  const videoTitle = document.createElement("div")
  videoTitle.className = "stage-card__h"
  videoTitle.style.marginTop = "12px"
  renderText(videoTitle, t("video.title"))

  const videoDesc = document.createElement("div")
  videoDesc.className = "stage-card__p"
  renderText(videoDesc, t("video.desc"))

  const row = document.createElement("div")
  row.className = "video-row"
  const mini = document.createElement("div")
  mini.className = "mini"
  const lab = document.createElement("div")
  lab.className = "label"
  renderText(lab, t("video.urlLabel"))
  const input = document.createElement("input")
  input.type = "url"
  input.inputMode = "url"
  input.value = url
  input.placeholder = langMode === "zh" ? "https://..." : langMode === "hmn" ? "https://..." : "https://..."
  input.addEventListener("change", () => setVideoUrl(stage.id, input.value.trim()))
  mini.appendChild(lab)
  mini.appendChild(input)

  const saveBtn = document.createElement("button")
  saveBtn.className = "btn"
  saveBtn.type = "button"
  renderText(saveBtn, t("video.save"))
  saveBtn.addEventListener("click", () => {
    setVideoUrl(stage.id, input.value.trim())
    renderStage()
    toast({ zh: "已保存视频链接", hmn: "Khaws link video lawm" })
  })

  row.appendChild(mini)
  row.appendChild(saveBtn)

  card.appendChild(h)
  card.appendChild(p)
  card.appendChild(steps)
  card.appendChild(videoTitle)
  card.appendChild(videoDesc)
  card.appendChild(row)

  if (url) {
    const v = document.createElement("video")
    v.className = "video"
    v.controls = true
    v.src = url
    v.playsInline = true
    card.appendChild(v)

    const hint = document.createElement("div")
    hint.className = "hint"
    renderText(hint, t("video.playHint"))
    card.appendChild(hint)
  } else {
    const empty = document.createElement("div")
    empty.className = "trend"
    renderText(empty, t("video.empty"))
    card.appendChild(empty)
  }

  box.appendChild(card)
}

const getCheckins = () => store.get("rehab.checkins", [])
const setCheckins = (arr) => store.set("rehab.checkins", arr)

const moodText = (m) => (m === "good" ? t("mood.good") : m === "bad" ? t("mood.bad") : t("mood.ok"))
const stageText = (stageId) => (stageId === "recovery" ? t("stage.recovery") : stageId === "walk" ? t("stage.walk") : t("stage.bed"))

const renderExerciseList = () => {
  const stageId = qs("#checkin-stage")?.value || activeStage
  const list = qs("#exercise-list")
  const items = EXERCISES[stageId] || []
  list.innerHTML = ""
  items.forEach((ex) => {
    const row = document.createElement("label")
    row.className = "item"
    const cb = document.createElement("input")
    cb.type = "checkbox"
    cb.name = "exercise"
    cb.value = ex.id
    const txt = document.createElement("div")
    txt.className = "txt"
    renderText(txt, ex)
    row.appendChild(cb)
    row.appendChild(txt)
    list.appendChild(row)
  })
}

const readCheckinForm = () => {
  const form = qs("#checkin-form")
  const data = new FormData(form)
  const date = String(data.get("date") || "").trim()
  const stageId = String(data.get("stage") || "").trim()
  const exercises = data.getAll("exercise").map(String)
  const minutesRaw = String(data.get("minutes") || "").trim()
  const painRaw = String(data.get("pain") || "").trim()
  const mood = String(data.get("mood") || "").trim()
  const note = String(data.get("note") || "").trim()

  const minutes = minutesRaw === "" ? null : Number(minutesRaw)
  const pain = painRaw === "" ? null : Number(painRaw)
  return { date, stageId, exercises, minutes, pain, mood: mood || null, note: note || null }
}

const fillCheckinForm = (rec) => {
  qs("#checkin-date").value = rec?.date || todayYmd()
  qs("#checkin-stage").value = rec?.stageId || "bed"
  renderExerciseList()
  const set = new Set(rec?.exercises || [])
  qsa('input[name="exercise"]').forEach((cb) => (cb.checked = set.has(cb.value)))
  qs("#checkin-minutes").value = rec?.minutes ?? ""
  qs("#checkin-pain").value = rec?.pain ?? ""
  qs("#checkin-mood").value = rec?.mood || "ok"
  qs("#checkin-note").value = rec?.note ?? ""
}

const renderCheckinHistory = () => {
  const list = qs("#checkin-history")
  const checkins = getCheckins().slice().sort((a, b) => (a.date < b.date ? 1 : -1))
  list.innerHTML = ""
  if (checkins.length === 0) {
    const row = document.createElement("div")
    row.className = "row"
    const h = document.createElement("div")
    h.className = "row__h"
    renderText(h, { zh: "暂无打卡记录", hmn: "Tsis tau muaj sau" })
    const p = document.createElement("div")
    p.className = "row__p"
    renderText(p, { zh: "完成一次训练后点击“保存打卡”。", hmn: "Ua ib zaug qoj ces nias “Khaws sau”." })
    row.appendChild(h)
    row.appendChild(p)
    list.appendChild(row)
    return
  }

  checkins.forEach((rec) => {
    const row = document.createElement("div")
    row.className = "row"

    const h = document.createElement("div")
    h.className = "row__h"
    const stageObj = stageText(rec.stageId)
    const exCount = (rec.exercises || []).length
    renderText(h, { zh: `${rec.date} · ${stageObj.zh} · 已选${exCount}项`, hmn: `${rec.date} · ${stageObj.hmn} · xaiv ${exCount} yam` })

    const p = document.createElement("div")
    p.className = "row__p"
    const moodObj = rec.mood ? moodText(rec.mood) : { zh: "-", hmn: "-" }
    const mins = rec.minutes == null ? "-" : `${rec.minutes}`
    const pain = rec.pain == null ? "-" : `${rec.pain}`
    renderText(p, {
      zh: `时长：${mins} 分钟\n疼痛：${pain}\n心情：${moodObj.zh}\n备注：${rec.note || "-"}`,
      hmn: `Ntev: ${mins} feeb\nMob: ${pain}\nSiab: ${moodObj.hmn}\nNqe lus: ${rec.note || "-"}`,
    })

    const actions = document.createElement("div")
    actions.className = "row__actions"

    const editBtn = document.createElement("button")
    editBtn.className = "btn small"
    editBtn.type = "button"
    renderText(editBtn, t("action.edit"))
    editBtn.addEventListener("click", () => {
      fillCheckinForm(rec)
      setActivePanel("checkin")
      toast({ zh: "已载入，可修改后再次保存", hmn: "Load lawm, hloov ces khaws dua" })
    })

    const delBtn = document.createElement("button")
    delBtn.className = "btn small danger"
    delBtn.type = "button"
    renderText(delBtn, t("action.delete"))
    delBtn.addEventListener("click", () => {
      const next = getCheckins().filter((x) => x.id !== rec.id)
      setCheckins(next)
      renderCheckinHistory()
      renderSupervise()
      toast({ zh: "已删除", hmn: "Rho tawm lawm" })
    })

    actions.appendChild(editBtn)
    actions.appendChild(delBtn)
    row.appendChild(h)
    row.appendChild(p)
    row.appendChild(actions)
    list.appendChild(row)
  })
}

const computeStreak = (checkins) => {
  const dates = Array.from(new Set(checkins.map((c) => c.date))).sort()
  if (dates.length === 0) return 0
  const has = new Set(dates)
  let cur = todayYmd()
  let streak = 0
  for (;;) {
    if (!has.has(cur)) break
    streak += 1
    const d = new Date(cur + "T00:00:00")
    d.setDate(d.getDate() - 1)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    cur = `${y}-${m}-${day}`
  }
  return streak
}

const renderSupervise = () => {
  const checkins = getCheckins()
  const totalDays = new Set(checkins.map((c) => c.date)).size
  const streak = computeStreak(checkins)
  const last = checkins.slice().sort((a, b) => (a.date < b.date ? 1 : -1))[0]
  qs("#stat-totalDays").textContent = String(totalDays)
  qs("#stat-streak").textContent = String(streak)
  qs("#stat-lastCheckin").textContent = last ? last.date : "-"

  const remind = qs("#remind-box")
  const lines = []
  const today = todayYmd()
  const hasToday = checkins.some((c) => c.date === today)
  if (!hasToday) lines.push({ zh: "今天还没打卡：做一点点也算完成。", hmn: "Hnub no tseem tsis tau sau: ua me me los tseem suav." })
  else lines.push({ zh: "今天已打卡：记得补水、休息、慢慢来。", hmn: "Hnub no twb sau lawm: nco haus dej, so, ua qeeb qeeb." })

  const recent = checkins
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3)
  const painHigh = recent.some((r) => r.pain != null && r.pain >= 7)
  if (painHigh)
    lines.push({
      zh: "近期疼痛偏高：优先休息、减量，必要时联系医生。",
      hmn: "Tsis ntev no mob ntau: so ua ntej, txo kev qoj, xav tau ces hu kws kho mob.",
    })

  const stage = recent[0]?.stageId || "bed"
  if (stage === "bed")
    lines.push({ zh: "卧床期重点：多次短练，防血栓与关节僵硬。", hmn: "Pw saum txaj: ua ntau zaug luv luv, tiv thaiv ntshav khov thiab pob qij txha." })
  if (stage === "recovery")
    lines.push({ zh: "恢复期重点：站立平衡与力量训练，注意安全扶稳。", hmn: "Rov qab: qoj sib npaug thiab zog, tuav ruaj kom nyab xeeb." })
  if (stage === "walk")
    lines.push({ zh: "行走准备期重点：先稳后快，步子小一点更安全。", hmn: "Npaj taug kev: ruaj ua ntej ces nrawm, kauj ruam me nyab xeeb dua." })

  remind.innerHTML = ""
  const box = document.createElement("div")
  box.className = "trend"
  const merged = lines.reduce(
    (acc, cur, idx) => ({
      zh: `${acc.zh}${idx ? "\n" : ""}• ${cur.zh}`,
      hmn: `${acc.hmn}${idx ? "\n" : ""}• ${cur.hmn}`,
    }),
    { zh: "", hmn: "" },
  )
  renderText(box, merged)
  remind.appendChild(box)

  const timeline = qs("#timeline")
  timeline.innerHTML = ""
  const show = checkins.slice().sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 10)
  if (show.length === 0) {
    const row = document.createElement("div")
    row.className = "row"
    const h = document.createElement("div")
    h.className = "row__h"
    renderText(h, { zh: "暂无记录", hmn: "Tsis tau muaj" })
    row.appendChild(h)
    timeline.appendChild(row)
    return
  }
  show.forEach((rec) => {
    const row = document.createElement("div")
    row.className = "row"
    const h = document.createElement("div")
    h.className = "row__h"
    const st = stageText(rec.stageId)
    renderText(h, { zh: `${rec.date} · ${st.zh}`, hmn: `${rec.date} · ${st.hmn}` })
    const p = document.createElement("div")
    p.className = "row__p"
    const exCount = (rec.exercises || []).length
    renderText(p, { zh: `完成项目：${exCount} 项`, hmn: `Ua tau: ${exCount} yam` })
    row.appendChild(h)
    row.appendChild(p)
    timeline.appendChild(row)
  })
}

const getMetrics = () => store.get("rehab.metrics", [])
const setMetrics = (arr) => store.set("rehab.metrics", arr)

const readMetricsForm = () => {
  const form = qs("#metrics-form")
  const data = new FormData(form)
  const num = (v) => {
    const s = String(v || "").trim()
    if (s === "") return null
    const n = Number(s)
    return Number.isFinite(n) ? n : null
  }
  return {
    ts: Date.now(),
    systolic: num(data.get("systolic")),
    diastolic: num(data.get("diastolic")),
    glucose: num(data.get("glucose")),
    tc: num(data.get("tc")),
    tg: num(data.get("tg")),
    ldl: num(data.get("ldl")),
  }
}

const renderMetrics = () => {
  const metrics = getMetrics().slice().sort((a, b) => b.ts - a.ts)
  const latest = metrics[0]
  const kv = qs("#metrics-latest")
  kv.innerHTML = ""
  if (!latest) {
    const row = document.createElement("div")
    row.className = "kvrow"
    const k = document.createElement("div")
    k.className = "k"
    renderText(k, { zh: "暂无数据", hmn: "Tsis tau muaj ntaub ntawv" })
    const v = document.createElement("div")
    v.className = "v"
    renderText(v, { zh: "保存一次指标后会显示在这里。", hmn: "Khaws ib zaug ntsuas ces yuav pom ntawm no." })
    row.appendChild(k)
    row.appendChild(v)
    kv.appendChild(row)
  } else {
    const addKv = (kKey, zhVal, hmnVal) => {
      const row = document.createElement("div")
      row.className = "kvrow"
      const k = document.createElement("div")
      k.className = "k"
      renderText(k, t(kKey))
      const v = document.createElement("div")
      v.className = "v"
      renderText(v, { zh: zhVal, hmn: hmnVal })
      row.appendChild(k)
      row.appendChild(v)
      kv.appendChild(row)
    }
    const bp =
      latest.systolic != null && latest.diastolic != null
        ? `${latest.systolic}/${latest.diastolic} mmHg`
        : latest.systolic != null
          ? `${latest.systolic} mmHg`
          : latest.diastolic != null
            ? `${latest.diastolic} mmHg`
            : "-"
    addKv("metrics.tableDate", fmtTs(latest.ts), fmtTs(latest.ts))
    addKv("metrics.bp", bp, bp)
    addKv("metrics.glucose", latest.glucose == null ? "-" : `${latest.glucose} mmol/L`, latest.glucose == null ? "-" : `${latest.glucose} mmol/L`)
    addKv("metrics.lipids", lipidText(latest), lipidText(latest))
  }

  const trend = qs("#metrics-trend")
  trend.innerHTML = ""
  const recent = metrics.slice(0, 7)
  const txt = buildTrendText(recent)
  renderText(trend, txt)

  const table = qs("#metrics-table")
  table.innerHTML = ""
  const head = document.createElement("div")
  head.className = "trow head"
  const h1 = document.createElement("div")
  const h2 = document.createElement("div")
  const h3 = document.createElement("div")
  renderText(h1, t("metrics.tableDate"))
  renderText(h2, t("metrics.tableBp"))
  renderText(h3, t("metrics.tableOther"))
  head.appendChild(h1)
  head.appendChild(h2)
  head.appendChild(h3)
  table.appendChild(head)
  if (metrics.length === 0) return
  metrics.slice(0, 30).forEach((m) => {
    const row = document.createElement("div")
    row.className = "trow"
    const c1 = document.createElement("div")
    const c2 = document.createElement("div")
    const c3 = document.createElement("div")
    c1.textContent = fmtTs(m.ts)
    c2.textContent =
      m.systolic != null && m.diastolic != null ? `${m.systolic}/${m.diastolic}` : m.systolic != null ? `${m.systolic}` : m.diastolic != null ? `${m.diastolic}` : "-"
    c3.textContent = otherText(m)
    row.appendChild(c1)
    row.appendChild(c2)
    row.appendChild(c3)
    table.appendChild(row)
  })
}

const lipidText = (m) => {
  const parts = []
  if (m.tc != null) parts.push(`TC ${m.tc}`)
  if (m.tg != null) parts.push(`TG ${m.tg}`)
  if (m.ldl != null) parts.push(`LDL ${m.ldl}`)
  return parts.length ? parts.join(" · ") : "-"
}

const otherText = (m) => {
  const parts = []
  if (m.glucose != null) parts.push(`Glu ${m.glucose}`)
  if (m.tc != null) parts.push(`TC ${m.tc}`)
  if (m.tg != null) parts.push(`TG ${m.tg}`)
  if (m.ldl != null) parts.push(`LDL ${m.ldl}`)
  return parts.length ? parts.join(" · ") : "-"
}

const diffArrow = (a, b) => {
  if (a == null || b == null) return { zh: "-", hmn: "-" }
  const d = a - b
  if (Math.abs(d) < 1e-9) return { zh: "→ 持平", hmn: "→ zoo ib yam" }
  if (d > 0) return { zh: `↑ +${d.toFixed(1)}`, hmn: `↑ +${d.toFixed(1)}` }
  return { zh: `↓ ${d.toFixed(1)}`, hmn: `↓ ${d.toFixed(1)}` }
}

const buildTrendText = (arr) => {
  if (!arr.length) return { zh: "暂无趋势数据。", hmn: "Tsis tau muaj kev hloov." }
  const a = arr[0]
  const b = arr[1]
  const lines = []

  const bpNow = a.systolic != null && a.diastolic != null ? `${a.systolic}/${a.diastolic}` : a.systolic != null ? `${a.systolic}` : a.diastolic != null ? `${a.diastolic}` : null
  const bpPrev = b ? (b.systolic != null && b.diastolic != null ? `${b.systolic}/${b.diastolic}` : b.systolic != null ? `${b.systolic}` : b.diastolic != null ? `${b.diastolic}` : null) : null

  if (bpNow) {
    lines.push({
      zh: `血压：${bpNow}${bpPrev ? `（上次 ${bpPrev}）` : ""}`,
      hmn: `Ntshav siab: ${bpNow}${bpPrev ? ` (zaum dhau ${bpPrev})` : ""}`,
    })
  }
  if (a.glucose != null) {
    const arrow = b ? diffArrow(a.glucose, b.glucose) : { zh: "-", hmn: "-" }
    lines.push({ zh: `血糖：${a.glucose} ${b ? arrow.zh : ""}`.trim(), hmn: `Qab zib: ${a.glucose} ${b ? arrow.hmn : ""}`.trim() })
  }
  const lip = lipidText(a)
  if (lip !== "-") lines.push({ zh: `血脂：${lip}`, hmn: `Rog: ${lip}` })
  if (!lines.length) lines.push({ zh: "已保存记录，但暂无可展示的数值。", hmn: "Khaws lawm tab sis tsis muaj tus lej qhia tau." })
  return lines.reduce(
    (acc, cur, idx) => ({ zh: `${acc.zh}${idx ? "\n" : ""}• ${cur.zh}`, hmn: `${acc.hmn}${idx ? "\n" : ""}• ${cur.hmn}` }),
    { zh: "", hmn: "" },
  )
}

const renderCareLists = () => {
  const diet = qs("#diet-list")
  const mind = qs("#mind-list")
  diet.innerHTML = ""
  mind.innerHTML = ""
  DIET_ITEMS.forEach((it) => {
    const li = document.createElement("li")
    renderText(li, it)
    diet.appendChild(li)
  })
  MIND_ITEMS.forEach((it) => {
    const li = document.createElement("li")
    renderText(li, it)
    mind.appendChild(li)
  })
}

const init = () => {
  applyTranslations()
  qsa(".seg").forEach((b) => b.addEventListener("click", () => setLangMode(b.dataset.langmode)))
  qsa(".nav__btn").forEach((b) => b.addEventListener("click", () => setActivePanel(b.dataset.target)))
  qsa(".chip").forEach((b) => b.addEventListener("click", () => setActiveStage(b.dataset.stage)))

  setLangMode(langMode === "zh" || langMode === "hmn" || langMode === "both" ? langMode : "both")
  setActivePanel(["guide", "checkin", "supervise", "metrics", "care"].includes(activePanel) ? activePanel : "guide")
  setActiveStage(["bed", "recovery", "walk"].includes(activeStage) ? activeStage : "bed")

  qs("#checkin-date").value = todayYmd()
  qs("#checkin-stage").value = activeStage
  renderExerciseList()
  qs("#checkin-stage").addEventListener("change", () => renderExerciseList())

  qs("#checkin-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const data = readCheckinForm()
    if (!data.date) return
    const now = Date.now()
    const all = getCheckins()
    const idx = all.findIndex((x) => x.date === data.date)
    const next = idx >= 0 ? all.slice() : all.concat()
    const rec = {
      id: idx >= 0 ? all[idx].id : uid(),
      date: data.date,
      stageId: data.stageId || "bed",
      exercises: data.exercises,
      minutes: data.minutes,
      pain: data.pain,
      mood: data.mood,
      note: data.note,
      createdAt: idx >= 0 ? all[idx].createdAt : now,
      updatedAt: now,
    }
    if (idx >= 0) next[idx] = rec
    else next.push(rec)
    setCheckins(next)
    renderCheckinHistory()
    renderSupervise()
    toast({ zh: idx >= 0 ? "已更新当天打卡" : "已保存打卡", hmn: idx >= 0 ? "Hloov hnub ntawd lawm" : "Khaws sau lawm" })
  })

  qs("#checkin-clear").addEventListener("click", () => {
    fillCheckinForm(null)
    toast({ zh: "已清空", hmn: "Rho tawm lawm" })
  })

  qs("#metrics-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const m = readMetricsForm()
    const hasAny =
      m.systolic != null || m.diastolic != null || m.glucose != null || m.tc != null || m.tg != null || m.ldl != null
    if (!hasAny) {
      toast({ zh: "请至少填写一项指标", hmn: "Thov sau tsawg kawg ib yam" })
      return
    }
    const all = getMetrics()
    all.push({ id: uid(), ...m })
    setMetrics(all)
    qs("#metrics-form").reset()
    renderMetrics()
    toast({ zh: "已保存指标", hmn: "Khaws ntsuas lawm" })
  })

  qs("#metrics-clear").addEventListener("click", () => {
    qs("#metrics-form").reset()
    toast({ zh: "已清空", hmn: "Rho tawm lawm" })
  })

  qs("#remind-refresh").addEventListener("click", () => {
    renderSupervise()
    toast({ zh: "已刷新", hmn: "Rov tshiab lawm" })
  })

  renderStage()
  renderCheckinHistory()
  renderSupervise()
  renderMetrics()
  renderCareLists()
}

document.addEventListener("DOMContentLoaded", init)
