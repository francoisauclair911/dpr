export default async ({ $axios }, locale) => {
  return await Promise.resolve({
    components: {
      buttons: {
        back: 'Back',
      },
      language_selector: {
        placeholder: 'Select your language',
      },
      button_donate: {
        donate: 'Donate',
      },
      custom_amount: {
        custom_amount_placeholder: 'Enter other amount',
      },
      step_2: {
        header: {
          donation_amount: 'Donation Amount',
        },
      },
      payment_details_step: {
        subheaders: {
          payment_information: 'Payment Information',
        },
      },
      thank_you_step: {
        header: {
          thank_you: 'Thank you for your donation',
        },
        subheader: {
          donation_detail: 'Donation Detail',
        },
        buttons: {
          support_other_causes: 'Support other causes',
        },
        fields: {
          donation_amount: 'Donation Amount',
          name: 'name',
          address: 'address',
          email: 'email',
          date: 'Donation Date',
        },
      },
      donorInfoForm: {
        subheaders: {
          fill_donor_code: 'Fill with your Donor Code',
          your_information: 'Your Information',
          billing_information: 'Billing Information',
        },
        fields: {
          title: {
            label: 'Title',
            placeholder: 'Mr',
            // options: await $axios(
            //   'https://adra-public-assets.s3.eu-west-1.amazonaws.com/json-apis/titles.json'
            // ).then((res) => res.data),
            options: [
              {
                text: 'Mr',
                value: 'mr',
              },
              {
                text: 'Mrs',
                value: 'mrs',
              },
              {
                text: 'Dr',
                value: 'dr',
              },
              {
                text: 'Dre',
                value: 'dre',
              },
            ],
          },
          firstName: {
            label: 'First Name',
            placeholder: 'John',
          },
          lastName: {
            label: 'Last Name',
            placeholder: 'John',
          },
          phone: {
            label: 'Phone',
            placeholder: '+1514',
          },
          email: {
            label: 'Email',
            placeholder: 'john@example.com',
          },
          street_address: {
            label: 'Street Address',
            placeholder: '...',
          },
          country: {
            label: 'Country',
            placeholder: '...',
          },
          city: {
            label: 'City',
            placeholder: '...',
          },
        },
      },
    },
  })
}
