export default defineI18nLocale(async locale => {
  return {
    pages: {
      error: {
        title: 'Nous sommes désolés',
        buttons: {
          back: 'Retour',
        },
        404: {
          message: 'La page est introuvable',
        },
        500: {
          message: "Une erreur s'est produite",
        },
      },
      confirm: {
        headers: {
          unsuccessful: "Votre don n'a pas abouti",
          please_try_again: 'Veuillez réessayer',
        },
        buttons: {
          try_again: 'Réessayer',
        },
      },
    },
    components: {
      donate_amount_step: {
        multiplier_text: 'Votre don devient',
      },
      payment_provider_list: {
        payment_information: 'Informations de paiement',
      },
      buttons: {
        back: 'Retour',
      },
      language_selector: {
        placeholder: 'Sélectionnez votre langue',
      },
      button_donate: {
        donate: 'Faire un don',
      },
      custom_amount: {
        custom_amount_placeholder: 'Saisir un autre montant',
      },
      step_2: {
        header: {
          donation_amount: 'Montant du don',
        },
      },
      payment_details_step: {
        subheaders: {
          payment_information: 'Informations de paiement',
        },
      },
      thank_you_step: {
        header: {
          thank_you: 'Merci pour votre don',
          payment_processing:
            'Votre don est en cours de traitement. Vous recevrez un e-mail de confirmation à la fin.',
        },
        subheader: {
          donation_detail: 'Détails du don',
        },
        buttons: {
          support_other_causes: "Soutenir d'autres causes",
        },
        fields: {
          donation_amount: 'Montant du don',
          name: 'Nom',
          address: 'Adresse',
          email: 'E-mail',
          date: 'Date du don',
        },
      },
      donorInfoForm: {
        subheaders: {
          fill_donor_code: 'Renseignez votre code de donateur',
          your_information: 'Vos informations',
          address_information: "Informations sur l'adresse",
        },
        fields: {
          title: {
            label: 'Titre',
            placeholder: 'M.',
          },
          firstName: {
            label: 'Prénom',
            placeholder: 'Jean',
          },
          lastName: {
            label: 'Nom de famille',
            placeholder: 'Dupont',
          },
          phone_calling_code: {
            label: 'Indicatif téléphonique',
            placeholder: '',
          },
          phone_number: {
            label: 'Numéro de téléphone',
            placeholder: '0144556677',
          },

          email: {
            label: 'E-mail',
            placeholder: 'jean@example.com',
          },
          birthday: {
            label: 'Date de naissance',
            placeholder: '1980-01-01',
          },
          address_line_1: {
            label: 'Adresse ligne 1',
            placeholder: '...',
          },
          address_line_2: {
            label: 'Adresse ligne 2',
            placeholder: '...',
          },
          country: {
            label: 'Pays',
            placeholder: '...',
          },
          locality: {
            label: 'Ville',
            placeholder: '...',
          },
          dependent_locality: {
            label: 'Nom du quartier',
            placeholder: '...',
          },
          administrative_area: {
            label: 'État/Province',
            placeholder: '...',
          },
          postal_code: {
            label: 'Code postal',
            placeholder: '...',
          },
        },
      },
    },
  }
})
