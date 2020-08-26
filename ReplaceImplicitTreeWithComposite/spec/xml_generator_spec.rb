require 'ostruct'
require_relative '../lib/xml_generator'

describe XmlGenerator do
  it 'generates xml' do
    Product = Struct.new(:id, :name, :price, :size)

    product1 = Product.new(1, "Absolut", "45.20", "700")
    product2 = Product.new(2, "Jim Beam", "32.99", "700")

    Order = Struct.new(:id, :products)
    order = Order.new(1, [product1, product2])
    orders = [order]
    generator = XmlGenerator.new

    xml = generator.generate_xml(orders)
    expect(xml).to eq "<orders><order id=1><product id=1 color='green' size=700ml><price currency='AUD'>45.20</price>Absolut</product><product id=2 color='green' size=700ml><price currency='AUD'>32.99</price>Jim Beam</product></order></orders>"
  end
end