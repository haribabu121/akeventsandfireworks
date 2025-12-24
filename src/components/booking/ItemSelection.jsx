import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from "emailjs-com";

const mockProducts = [
  { id: 1, name: 'sparcular machines', category: 'Setup' },
  { id: 2, name: 'fire-flame machines', category: 'Audio' },
  { id: 3, name: 'co2-jets', category: 'Visual' },
  { id: 4, name: 'smoke-bubble machines', category: 'Visual' },
  { id: 5, name: 'co2-jumbo-paper-machines', category: 'Furniture' },
  { id: 6, name: 'fan-wheel Rotator', category: 'Furniture' },
  { id: 7, name: 'Coldfires,category:Food'},
  { id: 8, name: 'Photography', category: 'Media' },
];
const ItemSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // FILTER PRODUCTS BASED ON SEARCH
  useEffect(() => {
    const filtered = mockProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page on new search
  }, [searchTerm]);

  // HANDLE INDIVIDUAL CHECKBOX CHANGE
  const handleCheckboxChange = (productId) => {
    setSelectedItems(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // HANDLE SELECT ALL ON CURRENT PAGE
  const handleSelectAll = (e) => {
    const currentItems = filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    if (e.target.checked) {
      const newSelected = [
        ...new Set([...selectedItems, ...currentItems.map(item => item.id)])
      ];
      setSelectedItems(newSelected);
    } else {
      const currentPageIds = currentItems.map(item => item.id);
      const newSelected = selectedItems.filter(id => !currentPageIds.includes(id));
      setSelectedItems(newSelected);
    }
  };

  // HANDLE PROCEED — SEND EMAIL AND REDIRECT
  const handleProceed = () => {
    const formData = location.state?.formData;

    if (!formData) {
      alert("Form data not found!");
      return;
    }

    const selectedProductsData = mockProducts.filter(p =>
      selectedItems.includes(p.id)
    );

    const productList = selectedProductsData
      .map(item => `${item.name} (${item.category})`)
      .join(", ");

    const emailParams = {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobileNo,
      occasion:
        formData.occasion === "other"
          ? formData.otherOccasion
          : formData.occasion,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      eventType: formData.eventType,
      notes: formData.additionalNotes || "No additional notes.",
      products: productList,
      productCount: selectedProductsData.length
    };

    emailjs
      .send(
        "service_sjsdn2q",     // Service ID
        "template_apj9ihs",    // Template ID
        emailParams,
        "JSypFwbJbZ8zqx-hf"    // Public Key
      )
      .then(() => {
        // Alert first, then redirect
        alert("Booking successful! 😊");
        navigate("/thank-you", { state: { productCount: selectedProductsData.length } });
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        alert("Failed to send email. Please try again.");
      });
  };

  // PAGINATION LOGIC
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const allCheckedOnPage =
    currentItems.length > 0 &&
    currentItems.every(item => selectedItems.includes(item.id));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Select Items for Your Event</h1>

      {/* Search */}
      <div className="mb-6 max-w-2xl">
        <input
          type="text"
          placeholder="Search items..."
          className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Selected Count */}
      <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
        <span className="font-medium text-yellow-800">Selected Items: {selectedItems.length}</span>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                      checked={allCheckedOnPage}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    S.No
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Product Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {currentItems.map((product, index) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                        checked={selectedItems.includes(product.id)}
                        onChange={() => handleCheckboxChange(product.id)}
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                      {product.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product.category}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredProducts.length)}
                </span>{' '}
                of <span className="font-medium">{filteredProducts.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
                </button>
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 border rounded-md"
        >
          Back
        </button>

        <button
          onClick={handleProceed}
          disabled={selectedItems.length === 0}
          className="px-6 py-2 bg-yellow-500 text-white rounded-md disabled:opacity-50"
        >
          Proceed with {selectedItems.length} Items
        </button>
      </div>
    </div>
  );
};

export default ItemSelection;

