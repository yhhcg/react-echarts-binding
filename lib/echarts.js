/**
 * @module Echarts
 */
import React from 'react';
import {
  object,
  string,
  bool,
  oneOfType,
} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import echarts from 'echarts';

const styles = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
});

@withStyles(styles)
/**
 * Exports Echarts component
 */
export default class Echarts extends React.Component {
  static propTypes = {
    classes: object.isRequired,
    theme: oneOfType([object, string]),
    opts: object,
    option: object.isRequired,
    notMerge: bool,
    lazyUpdate: bool,
    silent: bool,
  };

  static defaultProps = {};

  /**
   * @param {Object} props - Props
   */
  constructor(props) {
    super(props);
    this.props = props;
  }

  /**
   * [componentDidMount description]
   */
  componentDidMount() {
    const {
      theme,
      opts,
      option,
      notMerge,
      lazyUpdate,
      silent,
    } = this.props;

    this.echartsInstance = echarts.init(this.echartsDom, theme, opts);

    this.echartsInstance.setOption(option, {
      notMerge,
      lazyUpdate,
      silent,
    });
  }

  /**
   * Render Echarts component
   * @return {Component}
   */
  render() {
    const {
      classes,
    } = this.props;

    return (
      <div
        className={classes.root}
        ref={(e) => {
          this.echartsDom = e;
        }}
      />
    );
  }
}
