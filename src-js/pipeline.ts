function nameEstimators(estimators: (string | object)[]): [string, string | object][] {
  const names: string[] = estimators.map((estimator) =>
    typeof estimator === 'string' ? estimator : estimator.constructor.name.toLowerCase(),
  )

  const nameCount: { [key: string]: number } = {}
  for (const name of names) {
    nameCount[name] = (nameCount[name] || 0) + 1
  }

  for (const [k, v] of Object.entries(nameCount)) {
    if (v === 1) {
      delete nameCount[k]
    }
  }

  for (let i = estimators.length - 1; i >= 0; i--) {
    const name = names[i]
    if (name in nameCount) {
      names[i] += `-${nameCount[name]}`
      nameCount[name] -= 1
    }
  }

  return names.map((name, i) => [name, estimators[i]])
}
