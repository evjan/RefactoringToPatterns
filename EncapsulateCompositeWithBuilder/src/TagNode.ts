class TagNode {
  private tagName: String
  private children: TagNode[] = []

  constructor(tagName: String) {
    this.tagName = tagName
  }

  add(node: TagNode) {
    this.children.push(node)
  }

  toString(): string {
    var result = ''

    if(this.children.length > 0) {
      result = result.concat(`<${this.tagName}>`)
      this.children.forEach(child => {
        result = result.concat(child.toString())
      });

      result = result.concat(`</${this.tagName}>`)
    } else {
      result = result.concat(`<${this.tagName}/>`)
    }
    return result
  }
}

export { TagNode }