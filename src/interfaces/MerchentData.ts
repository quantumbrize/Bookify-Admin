export default interface MerchantInterface {
    id: string;
    phone: string;
    email: string ;
    status: string;
    name: string;
    businessName: string;
    gstNumber?: string;
    postalCode?: string;
    lastLoggedAt?: string;
  }