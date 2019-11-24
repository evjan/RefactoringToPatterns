require_relative '../lib/before'

describe 'Making a cake' do
  it 'has the right time consumption' do
    make_cake = MakeCake.new
    expect(make_cake.calculate_duration).to eq 46
  end
end

describe 'Making batter' do
  it 'has the right time consumption' do
    make_batter = MakeBatter.new
    expect(make_batter.duration).to eq 4
  end
end