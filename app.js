<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>康复助手 | Rehab Helper</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <div class="app">
      <header class="header">
        <div class="header__title">
          <div class="title" data-i18n="app.title"></div>
          <div class="subtitle" data-i18n="app.subtitle"></div>
        </div>
        <div class="lang">
          <button class="seg" type="button" data-langmode="both" aria-pressed="true" data-i18n="lang.both"></button>
          <button class="seg" type="button" data-langmode="zh" aria-pressed="false" data-i18n="lang.zh"></button>
          <button class="seg" type="button" data-langmode="hmn" aria-pressed="false" data-i18n="lang.hmn"></button>
        </div>
      </header>

      <main class="main" id="main">
        <section class="panel is-active" id="panel-guide" data-panel="guide" aria-labelledby="tab-guide">
          <div class="card">
            <div class="card__title" data-i18n="guide.title"></div>
            <div class="card__desc" data-i18n="guide.desc"></div>
          </div>

          <div class="card">
            <div class="card__title" data-i18n="guide.stageTitle"></div>
            <div class="stage-tabs" role="tablist" aria-label="stages">
              <button class="chip is-active" type="button" data-stage="bed" role="tab" aria-selected="true" data-i18n="stage.bed"></button>
              <button class="chip" type="button" data-stage="recovery" role="tab" aria-selected="false" data-i18n="stage.recovery"></button>
              <button class="chip" type="button" data-stage="walk" role="tab" aria-selected="false" data-i18n="stage.walk"></button>
            </div>
            <div class="stage" id="stage-content"></div>
          </div>
        </section>

        <section class="panel" id="panel-checkin" data-panel="checkin" aria-labelledby="tab-checkin">
          <div class="card">
            <div class="card__title" data-i18n="checkin.title"></div>
            <div class="card__desc" data-i18n="checkin.desc"></div>
          </div>

          <form class="card form" id="checkin-form">
            <div class="form__row">
              <label class="label" for="checkin-date" data-i18n="field.date"></label>
              <input class="input" id="checkin-date" name="date" type="date" required />
            </div>
            <div class="form__row">
              <label class="label" for="checkin-stage" data-i18n="field.stage"></label>
              <select class="select" id="checkin-stage" name="stage" required>
                <option value="bed" data-i18n="stage.bed"></option>
                <option value="recovery" data-i18n="stage.recovery"></option>
                <option value="walk" data-i18n="stage.walk"></option>
              </select>
            </div>
            <div class="form__row">
              <div class="label" data-i18n="field.exercises"></div>
              <div class="checklist" id="exercise-list"></div>
            </div>
            <div class="form__row">
              <label class="label" for="checkin-minutes" data-i18n="field.minutes"></label>
              <input class="input" id="checkin-minutes" name="minutes" type="number" min="0" step="1" inputmode="numeric" />
            </div>
            <div class="form__row">
              <label class="label" for="checkin-pain" data-i18n="field.pain"></label>
              <input class="input" id="checkin-pain" name="pain" type="number" min="0" max="10" step="1" inputmode="numeric" />
              <div class="hint" data-i18n="hint.pain"></div>
            </div>
            <div class="form__row">
              <label class="label" for="checkin-mood" data-i18n="field.mood"></label>
              <select class="select" id="checkin-mood" name="mood">
                <option value="good" data-i18n="mood.good"></option>
                <option value="ok" data-i18n="mood.ok"></option>
                <option value="bad" data-i18n="mood.bad"></option>
              </select>
            </div>
            <div class="form__row">
              <label class="label" for="checkin-note" data-i18n="field.note"></label>
              <textarea class="textarea" id="checkin-note" name="note" rows="3" data-i18n-placeholder="placeholder.note"></textarea>
            </div>
            <div class="actions">
              <button class="btn primary" type="submit" data-i18n="action.saveCheckin"></button>
              <button class="btn" type="button" id="checkin-clear" data-i18n="action.clearForm"></button>
            </div>
          </form>

          <div class="card">
            <div class="card__title" data-i18n="checkin.historyTitle"></div>
            <div class="list" id="checkin-history"></div>
          </div>
        </section>

        <section class="panel" id="panel-supervise" data-panel="supervise" aria-labelledby="tab-supervise">
          <div class="card">
            <div class="card__title" data-i18n="supervise.title"></div>
            <div class="card__desc" data-i18n="supervise.desc"></div>
          </div>

          <div class="grid2">
            <div class="card">
              <div class="card__title" data-i18n="supervise.statsTitle"></div>
              <div class="stats">
                <div class="stat">
                  <div class="stat__k" data-i18n="stat.totalDays"></div>
                  <div class="stat__v" id="stat-totalDays">0</div>
                </div>
                <div class="stat">
                  <div class="stat__k" data-i18n="stat.streak"></div>
                  <div class="stat__v" id="stat-streak">0</div>
                </div>
                <div class="stat">
                  <div class="stat__k" data-i18n="stat.lastCheckin"></div>
                  <div class="stat__v" id="stat-lastCheckin">-</div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card__title" data-i18n="supervise.remindTitle"></div>
              <div class="remind" id="remind-box"></div>
              <div class="actions">
                <button class="btn" type="button" id="remind-refresh" data-i18n="action.refresh"></button>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__title" data-i18n="supervise.timelineTitle"></div>
            <div class="timeline" id="timeline"></div>
          </div>
        </section>

        <section class="panel" id="panel-metrics" data-panel="metrics" aria-labelledby="tab-metrics">
          <div class="card">
            <div class="card__title" data-i18n="metrics.title"></div>
            <div class="card__desc" data-i18n="metrics.desc"></div>
          </div>

          <form class="card form" id="metrics-form">
            <div class="form__row">
              <div class="label" data-i18n="metrics.bp"></div>
              <div class="row2">
                <input class="input" name="systolic" type="number" min="40" max="260" step="1" inputmode="numeric" data-i18n-placeholder="placeholder.systolic" />
                <input class="input" name="diastolic" type="number" min="30" max="160" step="1" inputmode="numeric" data-i18n-placeholder="placeholder.diastolic" />
              </div>
              <div class="hint" data-i18n="hint.bp"></div>
            </div>
            <div class="form__row">
              <label class="label" for="metrics-glucose" data-i18n="metrics.glucose"></label>
              <input class="input" id="metrics-glucose" name="glucose" type="number" min="0" max="40" step="0.1" inputmode="decimal" data-i18n-placeholder="placeholder.glucose" />
            </div>
            <div class="form__row">
              <div class="label" data-i18n="metrics.lipids"></div>
              <div class="row3">
                <input class="input" name="tc" type="number" min="0" max="20" step="0.1" inputmode="decimal" data-i18n-placeholder="placeholder.tc" />
                <input class="input" name="tg" type="number" min="0" max="20" step="0.1" inputmode="decimal" data-i18n-placeholder="placeholder.tg" />
                <input class="input" name="ldl" type="number" min="0" max="20" step="0.1" inputmode="decimal" data-i18n-placeholder="placeholder.ldl" />
              </div>
              <div class="hint" data-i18n="hint.lipids"></div>
            </div>
            <div class="actions">
              <button class="btn primary" type="submit" data-i18n="action.saveMetrics"></button>
              <button class="btn" type="button" id="metrics-clear" data-i18n="action.clearForm"></button>
            </div>
          </form>

          <div class="grid2">
            <div class="card">
              <div class="card__title" data-i18n="metrics.latestTitle"></div>
              <div class="kv" id="metrics-latest"></div>
            </div>
            <div class="card">
              <div class="card__title" data-i18n="metrics.trendTitle"></div>
              <div class="trend" id="metrics-trend"></div>
            </div>
          </div>

          <div class="card">
            <div class="card__title" data-i18n="metrics.historyTitle"></div>
            <div class="table" id="metrics-table"></div>
          </div>
        </section>

        <section class="panel" id="panel-care" data-panel="care" aria-labelledby="tab-care">
          <div class="card">
            <div class="card__title" data-i18n="care.title"></div>
            <div class="card__desc" data-i18n="care.desc"></div>
          </div>

          <div class="grid2">
            <div class="card">
              <div class="card__title" data-i18n="care.dietTitle"></div>
              <ul class="ul" id="diet-list"></ul>
            </div>
            <div class="card">
              <div class="card__title" data-i18n="care.mindTitle"></div>
              <ul class="ul" id="mind-list"></ul>
            </div>
          </div>
        </section>
      </main>

      <nav class="nav" aria-label="navigation">
        <button class="nav__btn is-active" type="button" id="tab-guide" data-target="guide" data-i18n="nav.guide"></button>
        <button class="nav__btn" type="button" id="tab-checkin" data-target="checkin" data-i18n="nav.checkin"></button>
        <button class="nav__btn" type="button" id="tab-supervise" data-target="supervise" data-i18n="nav.supervise"></button>
        <button class="nav__btn" type="button" id="tab-metrics" data-target="metrics" data-i18n="nav.metrics"></button>
        <button class="nav__btn" type="button" id="tab-care" data-target="care" data-i18n="nav.care"></button>
      </nav>

      <div class="toast" id="toast" role="status" aria-live="polite"></div>
    </div>

    <script src="./app.js"></script>
  </body>
</html>
