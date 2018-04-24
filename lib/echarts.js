/**
 * @module Echarts
 */
import React from 'react';
import {
  object,
  string,
  bool,
  func,
  oneOfType,
} from 'prop-types';
import {withStyles} from 'material-ui/styles';
import echarts from 'echarts';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';

import createEventCallback from './createEventCallback';

const styles = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
});

@withStyles(styles)
/**
 * Echarts binding
 * Echarts HOME{@link http://echarts.baidu.com/}
 * For echarts events usage please reference to echarts API events paragraph.
 * {@link http://echarts.baidu.com/api.html#events}
 * @param {Object|String} theme - Echarts.init api parameters. {@link http://echarts.baidu.com/api.html#echarts.init}
 * @param {Object} opts - Echarts.init api parameters.
 * @param {Object} option - EchartsInstance.setOption api parameters. {@link http://echarts.baidu.com/api.html#echartsInstance.setOption}
 * @param {Boolean} notMerge - EchartsInstance.setOption api parameters.
 * @param {Boolean} lazyUpdate - EchartsInstance.setOption api parameters.
 * @param {Boolean} silent - EchartsInstance.setOption api parameters.
 * @param {Function} onComplete
 * @param {Function} onClick
 * @param {Function} onDblClick
 * @param {Function} onMouseDown
 * @param {Function} onMouseUp
 * @param {Function} onMouseOver
 * @param {Function} onMouseOut
 * @param {Function} onGlobalOut
 * @param {Function} onLegendSelectChanged
 * @param {Function} onLegendSelected
 * @param {Function} onLegendUnselected
 * @param {Function} onLegendScroll
 * @param {Function} onDataZoom
 * @param {Function} onDataRangeSelected
 * @param {Function} onTimeLineChanged
 * @param {Function} onTimeLinePlayChanged
 * @param {Function} onRestore
 * @param {Function} onDataViewChanged
 * @param {Function} onMagicTypeChanged
 * @param {Function} onGeoSelectChanged
 * @param {Function} onGeoSelected
 * @param {Function} onGeoUnselected
 * @param {Function} onPieSelectChanged
 * @param {Function} onPieSelected
 * @param {Function} onPieUnselected
 * @param {Function} onMapSelectChanged
 * @param {Function} onMapSelected
 * @param {Function} onMapUnselected
 * @param {Function} onAxisAreaSelected
 * @param {Function} onFocusNodeAdjacency
 * @param {Function} onUnfocusNodeAdjacency
 * @param {Function} onBrush
 * @param {Function} onBrushSelected
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
    onComplete: func,
    onClick: func,
    onDblClick: func,
    onMouseDown: func,
    onMouseUp: func,
    onMouseOver: func,
    onMouseOut: func,
    onGlobalOut: func,
    onLegendSelectChanged: func,
    onLegendSelected: func,
    onLegendUnselected: func,
    onLegendScroll: func,
    onDataZoom: func,
    onDataRangeSelected: func,
    onTimeLineChanged: func,
    onTimeLinePlayChanged: func,
    onRestore: func,
    onDataViewChanged: func,
    onMagicTypeChanged: func,
    onGeoSelectChanged: func,
    onGeoSelected: func,
    onGeoUnselected: func,
    onPieSelectChanged: func,
    onPieSelected: func,
    onPieUnselected: func,
    onMapSelectChanged: func,
    onMapSelected: func,
    onMapUnselected: func,
    onAxisAreaSelected: func,
    onFocusNodeAdjacency: func,
    onUnfocusNodeAdjacency: func,
    onBrush: func,
    onBrushSelected: func,
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
   * Init echarts
   * Set echarts options
   * Bind all events
   * Expose onComplete api
   * Listening dom changes
   */
  componentDidMount() {
    const {
      theme,
      opts,
      option,
      notMerge,
      lazyUpdate,
      silent,
      onComplete,
    } = this.props;

    this.echartsInstance = echarts.init(this.echartsDom, theme, opts);

    this.echartsInstance.setOption(option, {
      notMerge,
      lazyUpdate,
      silent,
    });
 
    this.eventCallbacks = this.parseEvents();

    this.bindEvents(this.echartsInstance, this.eventCallbacks);

    if (typeof onComplete === 'function') {
      onComplete(this.echartsInstance);
    }

    new ResizeSensor(this.echartsDom, () => { // Call resize callback if dom resized
      this.echartsInstance.resize();
    });
  }

  /**
   * Redraw if props updated
   * @param  {Object} nextProps
   * @param  {Object} nextState
   * @return {Boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    this.echartsInstance.setOption(nextProps.option);
    return false;
  }

  /**
   * Remove event listeners.
   * Destroy echarts instance.
   */
  componentWillUnmount() {
    this.echartsEventListeners.forEach((listener) => {
      this.echartsInstance.off(listener);
    });

    this.echartsInstance.clear();
    this.echartsInstance.dispose();
  }

  /**
   * Return an object of all supported event callbacks
   * @return {Object}
   */
  parseEvents() {
    return {
      onClick: createEventCallback('onClick').bind(this),
      onDblClick: createEventCallback('onDblClick').bind(this),
      onMouseDown: createEventCallback('onMouseDown').bind(this),
      onMouseUp: createEventCallback('onMouseUp').bind(this),
      onMouseOver: createEventCallback('onMouseOver').bind(this),
      onMouseOut: createEventCallback('onMouseOut').bind(this),
      onGlobalOut: createEventCallback('onGlobalOut').bind(this),
      onLegendSelectChanged: createEventCallback('onLegendSelectChanged').bind(this),
      onLegendSelected: createEventCallback('onLegendSelected').bind(this),
      onLegendUnselected: createEventCallback('onLegendUnselected').bind(this),
      onLegendScroll: createEventCallback('onLegendScroll').bind(this),
      onDataZoom: createEventCallback('onDataZoom').bind(this),
      onDataRangeSelected: createEventCallback('onDataRangeSelected').bind(this),
      onTimeLineChanged: createEventCallback('onTimeLineChanged').bind(this),
      onTimeLinePlayChanged: createEventCallback('onTimeLinePlayChanged').bind(this),
      onRestore: createEventCallback('onRestore').bind(this),
      onDataViewChanged: createEventCallback('onDataViewChanged').bind(this),
      onMagicTypeChanged: createEventCallback('onMagicTypeChanged').bind(this),
      onGeoSelectChanged: createEventCallback('onGeoSelectChanged').bind(this),
      onGeoSelected: createEventCallback('onGeoSelected').bind(this),
      onGeoUnselected: createEventCallback('onGeoUnselected').bind(this),
      onPieSelectChanged: createEventCallback('onPieSelectChanged').bind(this),
      onPieSelected: createEventCallback('onPieSelected').bind(this),
      onPieUnselected: createEventCallback('onPieUnselected').bind(this),
      onMapSelectChanged: createEventCallback('onMapSelectChanged').bind(this),
      onMapSelected: createEventCallback('onMapSelected').bind(this),
      onMapUnselected: createEventCallback('onMapUnselected').bind(this),
      onAxisAreaSelected: createEventCallback('onAxisAreaSelected').bind(this),
      onFocusNodeAdjacency: createEventCallback('onFocusNodeAdjacency').bind(this),
      onUnfocusNodeAdjacency: createEventCallback('onUnfocusNodeAdjacency').bind(this),
      onBrush: createEventCallback('onBrush').bind(this),
      onBrushSelected: createEventCallback('onBrushSelected').bind(this),
    };
  }

  /**
   * Bind all events on echarts instance.
   * Save event listeners.
   * Later to be removed in componentWillUnmount lifecycle.
   * @param  {Object} echartsInstance
   * @param  {Object} eventCallbacks - An object of all event callbacks
   */
  bindEvents(echartsInstance, eventCallbacks) {
    this.echartsEventListeners = [];

    Object.keys(eventCallbacks).forEach((key) => {
      const eventName = key.substring(2).toLowerCase();
      const handler = eventCallbacks[key];

      this.echartsEventListeners.push(
        echartsInstance.on(eventName, handler)
      );
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
