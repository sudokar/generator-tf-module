# frozen_string_literal: true

tf_state = 'terraform.tfstate'
kitchen_workspace = 'kitchen-terraform-default-terraform'
state_file = "example/terraform.tfstate.d/#{kitchen_workspace}/#{tf_state}"
state = JSON.parse(File.open(state_file).read)
output_value = state['outputs']['output_name']['value']

describe 'terraform output value' do
  it 'should not be nil' do
    expect(output_value).not_to eq nil
  end
  it 'should be equal to value' do
    expect(output_value).to eq 'output_value'
  end
end
