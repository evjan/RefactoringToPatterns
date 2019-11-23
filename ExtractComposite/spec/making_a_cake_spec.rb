require_relative '../lib/before'

describe 'Making a cake' do
  it 'has the right time consumption' do
    make_cake = MakeCake.new
    expect(make_cake.calculate_duration).to eq 46
  end
end