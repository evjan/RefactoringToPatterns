import { TagNode } from '../TheCode'

describe('TagNode', () => {

  describe('toString', () => {
    describe('when there are no children', () => {
      it('returns a tag when there are no children', () => {
        const expectedString = '<pizza/>'

        const tag = new TagNode('pizza')

        expect(tag.toString()).toEqual(expectedString)
      })

      it('returns a tag and attributes', () => {
        const expectedString = '<pizza size=large />'

        const tag = new TagNode('pizza', 'size=large')

        expect(tag.toString()).toEqual(expectedString)
      })
    })

    describe('when there are children', () => {
      it('returns a tag and children', () => {
        const expectedString = '<pizza><cheese/></pizza>'

        const tag = new TagNode('pizza')
        const topping = new TagNode('cheese')
        tag.add(topping)

        expect(tag.toString()).toEqual(expectedString)
      })

      it('returns a tag attributes and children', () => {
        const expectedString = '<pizza size=large><cheese/></pizza>'

        const tag = new TagNode('pizza', 'size=large')
        const topping = new TagNode('cheese')
        tag.add(topping)

        expect(tag.toString()).toEqual(expectedString)
      })

      it('returns a tag attributes and children and their attributes', () => {
        const expectedString = '<pizza size=large><cheese xtra /></pizza>'

        const tag = new TagNode('pizza', 'size=large')
        const topping = new TagNode('cheese', 'xtra')
        tag.add(topping)

        expect(tag.toString()).toEqual(expectedString)
      })
    })
  })
})
