(function () {
  // create "Module" object constructor
  function Module({ moduleNum, name, path, type, preview, sectionId, details }) {
    this.moduleNum = moduleNum;
    this.name = name;
    this.path = path;
    this.type = type || 'Module';
    this.preview = preview || {};
    this.sectionId = sectionId;
    this.details = details || {};
  }

  // add "Module" prototype properties and methods
  Module.prototype.getPath = function () {
    return `https://teamtreehouse.com/library${this.path}`;
  };
  Module.prototype.getVideoPath = function (path, token) {
    return `https://videos.teamtreehouse.com/${path}?token=${token}`;
  };

  // EXAMPLE: create "Module" object instance
  const myModule = new Module('1.0', 'Example', '/example', 'Course', 1);

  // retrieve module data
  const fetchModules = async () =>
    fetch('modules.json')
      .then((res) => res.json())
      .catch((err) => console.error(err.message));

  // render modules on UI
  const renderModules = async () => {
    // fetch module data
    const moduleData = await fetchModules();
    if (!moduleData) return;

    // create "Module" object instances
    const modules = moduleData.map((module) => new Module({ ...module }));

    // group "Module" objects by sectionId
    const groupedModules = modules.reduce((acc, cur) => {
      acc[cur.sectionId] = [...(acc[cur.sectionId] || []), cur];
      return acc;
    }, {});

    // build HTML markup for modules
    const html = Object.entries(groupedModules).map(
      ([key, value]) => `<section id="section${key}" class="py-5">
          <h2 class="h3 mb-3">Section ${key}</h2>
          <div class="row align-items-stretch">
            ${value
              .map((module, index) => {
                const getModalId = (key) => key && `module${key.replaceAll('.', 'dot')}`;
                const modalId = getModalId(module.moduleNum);
                const previousModalId = index > 0 && getModalId(value[index - 1].moduleNum);
                const nextModalId =
                  index < value.length - 1 && getModalId(value[index + 1].moduleNum);

                return `<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
                    <div class="card h-100">
                      ${
                        module.preview.sources
                          ? `<video class="card-img-top" controls>
                          ${module.preview.sources.map(
                            (source) =>
                              `<source
                                type="${source.type}"
                                src="${module.getVideoPath(`videos/${source.path}`, source.token)}"
                              >`
                          )}
                          <track label="English" srclang="en" kind="subtitles" src="subtitles/en/1.vtt">
                          Your browser does not support the <code>video</code> element.
                        </video>`
                          : `<img
                          class="card-img-top"
                          src="${module.getVideoPath(
                            `stills/${module.preview.path}`,
                            module.preview.token
                          )}"
                        />`
                      }
                      <div class="card-body">
                        <h2 class="card-title h5">${module.name}</h2>
                      </div>
                      <div class="card-footer">
                        <div class="row text-center">
                          <div class="col footer-item">
                            <a
                              href="javascript:void(0)"
                              class="card-link"
                              data-toggle="modal"
                              data-target="#${modalId}"
                            >
                              Learn More
                            </a>
                          </div>
                          <div class="col footer-item">
                            <a href="${module.getPath()}" target="_blank" class="card-link">
                              View ${module.type}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- component: modal -->
                  <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h2 class="modal-title h4">${module.name}</h2>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                        ${
                          Object.keys(module.details) <= 0
                            ? `
                            <div class="alert alert-primary" role="alert">
                              More information about this module coming soon!
                            </div>`
                            : ''
                        }
                        ${
                          module.details.learningObjectives
                            ? `
                            <h3 class="h5">Learning Objectives</h3>
                            <ul>
                              ${module.details.learningObjectives
                                .map((objective) => `<li>${objective}</li>`)
                                .join('')}
                            </ul>`
                            : ''
                        }
                        </div>
                        <div class="modal-footer d-flex justify-content-between">
                        ${
                          previousModalId
                            ? `
                            <button
                              type="button"
                              class="btn btn-outline-primary"
                              data-dismiss="modal"
                              data-toggle="modal"
                              data-target="#${previousModalId}"
                            >
                              Previous
                            </button>`
                            : '<span></span>'
                        }
                          ${
                            nextModalId
                              ? `
                              <button
                                type="button"
                                class="btn btn-primary"
                                data-dismiss="modal"
                                data-toggle="modal"
                                data-target="#${nextModalId}"
                              >
                                Next Module
                              </button>`
                              : '<span></span>'
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /component: modal -->`;
              })
              .join('')}
          </div>
        </section>`
    );

    // render HTML markup
    const modulesEl = document.querySelector('[data-target=modules]');
    modulesEl.innerHTML = html.join('');
  };

  renderModules();
})();
