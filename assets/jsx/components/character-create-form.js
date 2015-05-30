var
  React = require('React'),
  ClassSelector = require('./class-selector');

var CharacterCreateForm = React.createClass({
  onSubmit: function (e) {
    var data = {
      name: React.findDOMNode(this.refs.name).value,
      level: React.findDOMNode(this.refs.level).value,
      profession: React.findDOMNode(this.refs.profession).value
    };

    io.socket.post('/character', data, function (data) {
      alert('Character created');
    });


    e.preventDefault();
  },
  render: function() {
    return (
      <form method="POST" className="form" action="/character/create" onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input ref="name" type="text" placeholder="Character name" name="character[name]" />
        </div>

        <div className="form-group">
          <label>Profession</label>
          <ClassSelector name="character[profession]" ref="profession" />
        </div>

        <div className="form-group">
          <label>Level</label>
          <input type="number" name="character[level]" defaultValue="1" ref="level" />
        </div>

        <div className="form-group">
          <input type="submit" name="character[submit]" value="Create" />
        </div>
      </form>
    );
  }
});

module.exports = CharacterCreateForm;

