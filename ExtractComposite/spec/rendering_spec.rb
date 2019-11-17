require 'rspec'
require_relative '../lib/rendering'

describe 'node' do
  it 'is crazy' do
    node = Node.new
    expect(node.to_plain_text_string).to eq ""
  end
end
