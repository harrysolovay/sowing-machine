import * as format from '../format'
import {createElement, cloneElement} from 'react'

export const fn = (subject, stages, quasi) => {
  const stagesApplied = stages
    ? stages.reduce((stage, args) => stage(...args), subject)
    : subject

  return quasi ? stagesApplied(...format.asTagArgs(quasi)) : stagesApplied
}

export const component = (subject, stages, quasi) =>
  createElement(subject, ...format.react(stages, quasi))

export const element = (subject, stages, quasi) =>
  cloneElement(subject, ...format.react(stages, quasi))
