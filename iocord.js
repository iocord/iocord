class Space {
  constructor(n, d) {
    this.value = []
    this.length = n
    this.dimensions = d
    for (let i = 0; i < n ** d; i++) {
      this.value.push(i)
    }
  }

  point(...coords) {
    const axes = [...coords]
    if (coords.length !== this.dimensions) {
      for (i = axes.length; i < this.dimensions; i++) {
        axes.push(0)
      }
    }
    let index = 0
    for (let i = 0; i < axes.length; i++) {
      index += axes[i] * this.length ** i
    }
    return this.value[index]
  }

  assign(value, ...coords) {
    const axes = [...coords]
    if (coords.length !== this.dimensions) {
      for (i = axes.length; i < this.dimensions; i++) {
        axes.push(0)
      }
    }
    let index = 0
    for (let i = 0; i < axes.length; i++) {
      index += axes[i] * this.length ** i
    }
    this.value[index] = value
    return this.value
  }
}

class Tally {
  constructor(a) {
    this.value = new Map()
    for (const item of a) {
      const value = this.value.get(item)
      if (value) {
        this.value.set(item, value + 1)
      } else {
        this.value.set(item, 1)
      }
    }
  }

  add(pointer, n) {
    if (!this.value.get(pointer)) {
      this.value.set(pointer, 0)
    }
    if (this.value.get(pointer) + n < 0) {
      return this.value.set(pointer, 0)
    }
    return this.value.set(pointer, this.value.get(pointer) + n)
  }

  to(type) {
    if (Array.isArray(type)) {
      const a = []
      for (const [key, value] of this.value) {
        for (let i = 0; i < value; i++) {
          a.push(key)
        }
      }
      return a
    } else if (typeof type === 'object') {
      let obj = {}
      for (const [key, value] of this.value) {
        obj[key] = value
      }
      return obj
    }
  }
}

class List {
  constructor(...items) {
    this.value = sort([...items])
  }

  insert(item, index) {
    return this.value.splice(index, 0, item)
  }

  add(...items) {
    for (const item of [...items]) {
      let index = 0
      while (item > this.value[index]) {
        console.log(index)
        index++
      }
      this.insert(item, index)
    }
    return this.value
  }

  remove(...items) {
    for (const item of [...items]) {
      const index = this.search(item)
      if (index !== undefined) {
        this.value.splice(index, 1)
      }
    }
    return this.value
  }

  search(item, start, end) {
    if (!start) start = 0
    if (!end) end = this.value.length
    if (start > end) return undefined
    let mid = Math.floor((start + end)/2)
    if (this.value[mid] === item) return mid
    if (this.value[mid] > item) {
      return this.search(item, start, mid - 1)
    } else {
      return this.search(item, mid + 1, end)
    }
  }
}

class Grid {
  constructor(w, h) {
    if (!h) h = w
    this.value = []
    for (let x = 0; x < w; x++) {
      const col = []
      for (let y = 0; y < h; y++) {
        col.push(x * w + y)
      }
      this.value.push(col)
    }
    this.width = w
    this.height = h
  }

  set(x, y, item) {
    this.value[x][y] = item
    return this.value
  }

  get(x, y) {
    return this.value[x][y]
  }

  column(x) {
    return this.value[x]
  }

  row(y) {
    const a = []
    for (let x = 0; x < this.width; x++) {
      a.push(this.value[x][y])
    }
    return a
  }
}

class Lever {
  constructor(state) {
    if (state) {
      this.value = 1
    } else {
      this.value = 0
    }
  }

  toggle() {
    return this.value = !this.value * 1
  }

  on() {
    return this.value = 1
  }

  off() {
    return this.value = 0
  }

  set(state) {
    if (state) {
      this.value = 1
    } else {
      this.value = 0
    }
    return this.value
  }
}

class IO {
  constructor() {
    this.special = [
      'reset',
      'bright',
      'dim',
      'underscore',
      'blink',
      'reverse',
      'hidden',
    ]

    this.color = [
      'black',
      'red',
      'green',
      'yellow',
      'blue',
      'magenta',
      'cyan',
      'white',
    ]

    this.bg = [
      'black',
      'red',
      'green',
      'yellow',
      'blue',
      'magenta',
      'cyan',
      'white',
    ]
  }

  print(type, choice, ...args) {
    let add = 0
    if (type === 'color') {
      add = 30
    } else if (type === 'bg') {
      add = 40
    }
    console.log(`\x1b[${this[type].indexOf(choice) + add}m`, ...args, `\x1b[0m`)
  }

  log(color, ...args) {
    console.log(`\x1b[${this.color.indexOf(color) + 30}m`, ...args, `\x1b[0m`)
  }

  error(text) {
    if (typeof text === 'string') {
      console.log(`\x1b[${this.color.indexOf('red') + 30}m`, text, `\x1b[0m`)
    }
  }
  
  warn(text) {
    if (typeof text === 'string') {
      console.log(`\x1b[${this.color.indexOf('yellow') + 30}m`, text, `\x1b[0m`)
    }
  }

  pass(text) {
    if (typeof text === 'string') {
      console.log(`\x1b[${this.color.indexOf('green') + 30}m`, text, `\x1b[0m`)
    }
  }
}

module.exports = {
  Space: Space,
  Tally: Tally,
  List: List,
  Grid: Grid,
  Lever: Lever,
  IO: IO,
}


function sort(items) {
  let interval = 1

  while (interval < items.length / 3) {
    interval = interval * 3 + 1
  }

  while (interval > 0) {
    for (let outer = interval; outer < items.length; outer++) {
      const value = items[outer]
      let inner = outer

      while (inner > interval - 1 && items[inner - interval] >= value) {
        items[inner] = items[inner - interval]
        inner = inner - interval
      }
      items[inner] = value
    }
    interval = (interval - 1) / 3
  }
  return items
}

function type(data) {
  if (typeof data === 'function') {
    return 0
  } else if (Array.isArray(data)) {
    return 1
  } else if (typeof data === 'object') {
    return 2
  } else if (typeof data === 'string') {
    return 3
  }
}

Array.prototype.insert = function(index, ...items) {
  this.splice(index, 0, ...items)
  return this
}

Array.prototype.delete = function(index, n) {
  if (!n) n = 1
  if (!index) index = 0
  this.splice(index, n)
  return this
}

Array.prototype.remove = function(items) {
  for (let i = 0; i < this.length; i++) {
    if (items.includes(this[i])) {
      this.splice(i, 1)
    }
  }
  return this
}

Array.prototype.index = function(item, start, end) {
  if (!start) start = 0
  if (!end) end = this.length
  if (start > end) return undefined
  let mid = Math.floor((start + end)/2)
  if (this[mid] === item) return mid
  if (this[mid] > item) {
    return this.has(item, start, mid - 1)
  } else {
    return this.has(item, mid + 1, end)
  }
}

Array.prototype.match = function(rule) {
  switch (type(rule)) {
    case 0:
      return this.filter(rule)
    case 1:
      return this.filter((x) => {
        if (!x[rule[0]]) return false
        return x[rule[0]].equals(rule[1])
      })
    case 2:
      return this.filter((x) => {
        for (const [key, value] of Object.entries(rule)) {
          if (x[key] !== value && !x[key].equals(value)) return false
        }
        return true
      })
    case 3:
      return this.filter(x => x[rule])
  }
}

Array.prototype.equals = function(a) {
  if (type(a) === 1 && a.length === this.length) {
    for (let i = 0; i < this.length; i++) {
      if (this[i] !== a[i] && !this[i].equals(a[i])) return false
    }
    return true
  } else {
    return false
  }
}

Array.prototype.sort = function() {
  let interval = 1

  while (interval < this.length / 3) {
    interval = interval * 3 + 1
  }

  while (interval > 0) {
    for (let outer = interval; outer < this.length; outer++) {
      const value = this[outer]
      let inner = outer

      while (inner > interval - 1 && this[inner - interval] >= value) {
        this[inner] = this[inner - interval]
        inner = inner - interval
      }
      this[inner] = value
    }
    interval = (interval - 1) / 3
  }
  return this
}

String.prototype.equals = function(s) {
  return this.toLowerCase() === s.toLowerCase()
}

Object.prototype.equals = function(o) {
  if (type(o) !== 2 || Object.keys(this).length !== Object.keys(o).length) {
    return false
  }
  for (const [key, value] of Object.entries(o)) {
    if (this[key] !== value && !this[key].equals(value)) return false
  }
  return true
}