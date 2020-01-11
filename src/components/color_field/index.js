import React from 'react';
import { SketchPicker } from 'react-color'
import './color_field.css'
import ClickOutside from 'components/click_outside_wrapper'

class ColorField extends React.Component {
  state = {
    displayColorPicker: false,
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.hex })
    this.props.onChange(color.hex)
  };

  render () {
    const {color} = this.state
    return (
      <div className="color text_field form_field">
        { this.props.label ? <label className="form_label">{this.props.label}</label> : null}
        <div onClick={ this.handleClick }>
          <div className="color__swatch" style={{background: this.props.value}}/>
        </div>

        { this.state.displayColorPicker ?
          <ClickOutside callback={ this.handleClose }>
            <div className="color__popover">
              <div onClick={ this.handleClose }/>
              <SketchPicker color={ this.props.value } onChange={ this.handleChange } />
            </div>
          </ClickOutside>
        : null }

      </div>
    );
  }

}

export default ColorField
