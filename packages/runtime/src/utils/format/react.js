import {recombine} from './quasi'

export default (stages, quasi) => {
  const args = []

  if (Array.isArray(stages)) {
    const [wrappedPropsOrChildrenOrEmpty = [], childrenOrEmpty = []] = stages

    if (wrappedPropsOrChildrenOrEmpty && wrappedPropsOrChildrenOrEmpty.length) {
      const [propsOrFirstChild] = wrappedPropsOrChildrenOrEmpty

      if (
        !Array.isArray(propsOrFirstChild) &&
        typeof propsOrFirstChild === 'object'
      ) {
        args.push(propsOrFirstChild, ...(childrenOrEmpty || []))
      } else {
        args.push(null, ...wrappedPropsOrChildrenOrEmpty)
      }
    }
  }

  // args.length &&
  //   args.length > 1 &&
  //   console.error(
  //     'Conflicting children from (a) params and (b) template string',
  //   )

  !args.length && args.push(null)
  quasi && args.push(recombine(quasi))

  return args
}
