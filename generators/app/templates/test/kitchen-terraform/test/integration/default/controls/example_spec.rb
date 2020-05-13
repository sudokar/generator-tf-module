# frozen_string_literal: true

control 'terraform output value' do
  describe attribute('output_name') do
    it { should_not eq nil }
  end

  describe attribute('output_name') do
    it { should eq 'output_value' }
  end
end
