interface RefundResponse {
  success: boolean;
  message: string;
}

export const initiateRefund = async (orderId: string): Promise<RefundResponse> => {
  try {
    const response = await fetch('/api/refund', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.JWT_SECRET}`,
      },
      body: JSON.stringify({ orderId }),
    });

    if (!response.ok) {
      // Log the response status and any error data
      const errorData = await response.json();
      console.error('Refund API error:', {
        status: response.status,
        errorData,
      });
      return {
        success: false,
        message: errorData.message || 'An unknown error occurred.',
      };
    }

    const result = await response.json();
    return {
      success: result.success,
      message: result.message || 'Refund processed successfully.',
    };
  } catch (error) {
    console.error('Error initiating refund:', error);
    return {
      success: false,
      message: `Failed to initiate refund: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
};
