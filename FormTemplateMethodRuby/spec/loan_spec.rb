require 'rspec'
require_relative '../lib/loan'

describe Loan do

  context 'Term loan' do

    let(:commitment) { 12 }
    let(:start) { 0 }
    let(:maturity) { 0 }
    let(:risk_rating) { 1 }

    subject { described_class.new_term_loan(commitment, start, maturity, risk_rating) }

    describe 'capital' do
      it 'works' do
        expect(subject.capital).to be_within(0.1).of(144)
      end
    end
  end

  context 'Advised Line loan' do

    let(:commitment) { 12 }
    let(:start) { 0 }
    let(:expiry) { 0 }
    let(:risk_rating) { 1 }

    subject { described_class.new_advised_line(commitment, start, expiry, risk_rating) }

    describe 'capital' do
      it 'works' do
        expect(subject.capital).to be_within(0.1).of(14.4)
      end
    end
  end

end