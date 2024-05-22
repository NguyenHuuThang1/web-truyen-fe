import React, { Fragment, useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { Modal, Spinner, Button } from 'flowbite-react';
import { getUser } from '../../../services/api/admin/getUserList';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser } from '../../../services/api/admin/updateUser';
import { toast } from 'react-toastify';
const role = ['user', 'translator', 'admin'];

export const UpdateUser = () => {
  const [openModal, setOpenModal] = useState(false);
  const param = useParams();
  const [selectedRole, setSelectedRole] = useState(role[0]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const handleUpdateUser = async () => {
    try {
      const res = await updateUser(param.uId, selectedRole);
      toast.success('🦄 Thành công!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      navigate('/admin');
    } catch (error) {
      toast.error('💣 Lỗi xin thử lại', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(param.uId);
        const res = await getUser(param.uId);
        setUser(res.data);
        setSelectedRole(res.data.role);
        setIsLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, []);
  if (isLoading)
    return (
      <div className="w-full h-screen flex">
        <div className="m-auto">
          <Spinner
            className="animate-spin-in "
            aria-label="spinner example"
            size="lg"
          />
        </div>
      </div>
    );
  return (
    <div
      className={`bg-[url('/src/assets/back.avif')] w-full h-screen bg-no-repeat bg-cover`}
    >
      <div className=" mt-8 ml-8 rounded-lg bg-white p-8 w-[50%]">
        <form>
          <div className="flex">
            <img
              src={user.avatar}
              alt=""
              className="h-[140px] w-[140px] rounded-full shadow-xl"
            />
            <div className="ml-2 grid content-between pb-16 flex-1">
              <small className="text-gray-500">{'id: ' + user.id}</small>
              <h2 className="text-2xl font-medium">
                {'Name: ' + user.firstName + ' ' + user.lastName}
              </h2>
              <h2 className="text-xl font-normal">{'Email: ' + user.email}</h2>
              <h2 className="text-xl font-normal text-red-600">
                {'Role: ' + user.role}
              </h2>
            </div>
          </div>
          <div className="flex">
            <div className="text-white">
              <div className="py-2 px-4 w-[160px] text-center bg-red-500 rounded-lg relative">
                <Listbox value={selectedRole} onChange={setSelectedRole}>
                  <Listbox.Button>{selectedRole}</Listbox.Button>
                  <Listbox.Options className="absolute top-full left-0 bg-red-400 px-8 rounded-lg border-2">
                    {role.map((r, index) => (
                      /* Use the `active` state to conditionally style the active option. */
                      /* Use the `selected` state to conditionally style the selected option. */
                      <Listbox.Option key={index} value={r} as={Fragment}>
                        {({ active, selected }) => (
                          <li className={`cursor-pointer w-[94px]`}>{r}</li>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              </div>
            </div>
            <form>
              <button
                type="button"
                onClick={() => setOpenModal(true)}
                className="ml-16 py-2 px-4 w-[160px] bg-red-500 text-white  rounded-lg relative"
              >
                Lưu
              </button>
              <>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                  <Modal.Header>Có chắc sẽ lưu không 🧐</Modal.Header>
                  <Modal.Body>
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Khi lưu user này sẽ có vai trò mới có thể ảnh hướng tới
                        website!?
                      </p>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={handleUpdateUser}>Lưu</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                      Huỷ
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            </form>
          </div>
        </form>
      </div>
    </div>
  );
};
