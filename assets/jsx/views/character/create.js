var
  React = require('React'),
  ClassSelector = require('./../../components/class-selector');

React.render(
  <form method="POST" className="form" action="/character/create">
    <div className="form-group">
      <label>Name</label>
      <input type="text" name="character[name]" />
    </div>

    <div className="form-group">
      <label>Profession</label>
      <ClassSelector selected="sol" name="character[profession]" />
    </div>

  </form>,
  document.getElementById('mainMountNode')
);