class TagNode {
  private tagName: string
  private attributes: string | undefined
  private children: TagNode[] = []

  constructor(tagName: string, attributes?: string) {
    this.tagName = tagName
    this.attributes = attributes
  }

  add(node: TagNode) {
    this.children.push(node)
  }

  toString(): string {
    var result = ''

    if(this.children.length > 0) {
      if(this.attributes) {
        result = result.concat(`<${this.tagName} ${this.attributes}>`)
      } else {
        result = result.concat(`<${this.tagName}>`)
      }

      this.children.forEach(child => {
        result = result.concat(child.toString())
      });

      result = result.concat(`</${this.tagName}>`)
    } else {
      if(this.attributes) {
        result = result.concat(`<${this.tagName} ${this.attributes} />`)
      } else {
        result = result.concat(`<${this.tagName}/>`)
      }
    }
    return result
  }
}

export { TagNode }
