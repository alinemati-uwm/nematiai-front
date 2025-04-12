import { type Canvas } from "fabric";

import type imageEditorTypes from "../../../type";

type getLastIndex = {
  history: imageEditorTypes["states"]["history"];
  undo: boolean;
};

type add = {
  canvas: Canvas;
};

type findIndex = {
  timeline: imageEditorTypes["states"]["history"]["timeline"];
  timeStampTarget: number;
};

const historyImageEditorModel = (() => {
  const findIndex = ({ timeStampTarget, timeline }: findIndex) =>
    Object.keys(timeline).indexOf(timeStampTarget.toString());

  const retrieveTimelineStepKey = ({ history, undo }: getLastIndex) => {
    if (!history.timestamp) return;
    const currentKey = findIndex({
      timeline: history.timeline,
      timeStampTarget: history.timestamp,
    });
    if (currentKey !== null) {
      const key = undo ? currentKey - 1 : currentKey + 1;
      return Object.keys(history.timeline)[key];
    }
    return null;
  };

  const makeItems = ({ canvas }: add) => {
    const objectsWithIds = canvas
      .getObjects()
      .map((obj: imageEditorTypes["customs"]["FabricObject"]) => ({
        id: obj.id,
        ...(obj.objectCaching && { objectCaching: obj.objectCaching }),
        ...obj.toObject(),
        ...(obj.filters && { filters: obj.filters, filterID: obj.filterID }),
        ...(obj.id === "_frame" && { fill: "#FFF" }),
        ...(obj.customType && { customType: obj.customType }),
      }));
    const jsonString = JSON.parse(JSON.stringify(objectsWithIds));
    return jsonString;
  };

  const limitTimeline = (
    timeline: imageEditorTypes["states"]["history"]["timeline"],
  ) => {
    const items = Object.entries(timeline).slice(-16);
    const lastTenKeys: Record<string, any> = [];
    items.forEach(item => {
      lastTenKeys[item[0]] = item[1];
    });
    return lastTenKeys;
  };

  const clearTimeline = ({
    timeline,
    timestamp,
  }: imageEditorTypes["states"]["history"]) => {
    const lastTimestamp = getLastTimestamp(timeline);
    if ((timestamp && lastTimestamp === timestamp) || !timestamp) return;
    const targetIndex = findIndex({ timeline, timeStampTarget: timestamp });
    const keys = Object.keys(timeline).slice(0, targetIndex + 1);
    return keys.reduce((result: any, key) => {
      result[key] = timeline[key];
      return result;
    }, {});
  };

  const getLastTimestamp = (
    timeline: imageEditorTypes["states"]["history"]["timeline"],
  ) => {
    const keysTimeline = Object.keys(timeline);
    return Number(keysTimeline[keysTimeline.length - 1]);
  };

  return {
    retrieveTimelineStepKey,
    makeItems,
    limitTimeline,
    clearTimeline,
    getLastTimestamp,
  };
})();

export default historyImageEditorModel;
