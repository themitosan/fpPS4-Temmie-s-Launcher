/*
	*********************************************************************************************************************
		
		fpPS4 Temmie's Launcher
		NTSTATUS.js

		Microsoft NTSTATUS Values database
	
		Original source:
		https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-erref/596a1078-e883-4972-9bbc-49e60bebca55

        many thanks to red-prig for sending me this file

	*********************************************************************************************************************
*/

temp_NTSTATUS = {

    0: {
        "hex": "0x00000000",
        "id": "STATUS_WAIT_0",
        "desc": "The caller specified WaitAny for WaitType and one of the dispatcher objects in the Object array has been set to the signaled state."
    },
    2: {
        "hex": "0x00000002",
        "id": "STATUS_WAIT_2",
        "desc": "The caller specified WaitAny for WaitType and one of the dispatcher objects in the Object array has been set to the signaled state."
    },
    63: {
        "hex": "0x0000003F",
        "id": "STATUS_WAIT_63",
        "desc": "The caller specified WaitAny for WaitType and one of the dispatcher objects in the Object array has been set to the signaled state."
    },
    128: {
        "hex": "0x00000080",
        "id": "STATUS_ABANDONED_WAIT_0",
        "desc": "The caller attempted to wait for a mutex that has been abandoned."
    },
    192: {
        "hex": "0x000000C0",
        "id": "STATUS_USER_APC",
        "desc": "A user-mode APC was delivered before the given Interval expired."
    },
    258: {
        "hex": "0x00000102",
        "id": "STATUS_TIMEOUT",
        "desc": "The given Timeout interval expired."
    },
    260: {
        "hex": "0x00000104",
        "id": "STATUS_REPARSE",
        "desc": "A reparse should be performed by the Object Manager because the name of the file resulted in a symbolic link."
    },
    262: {
        "hex": "0x00000106",
        "id": "STATUS_NOT_ALL_ASSIGNED",
        "desc": "Indicates not all privileges or groups that are referenced are assigned to the caller. This allows, for example, all privileges to be disabled without having to know exactly which privileges are assigned."
    },
    264: {
        "hex": "0x00000108",
        "id": "STATUS_OPLOCK_BREAK_IN_PROGRESS",
        "desc": "An open/create operation completed while an opportunistic lock (oplock) break is underway."
    },
    266: {
        "hex": "0x0000010A",
        "id": "STATUS_RXACT_COMMITTED",
        "desc": "This success level status indicates that the transaction state already exists for the registry subtree but that a transaction commit was previously aborted. The commit has now been completed."
    },
    268: {
        "hex": "0x0000010C",
        "id": "STATUS_NOTIFY_ENUM_DIR",
        "desc": "Indicates that a notify change request is being completed and that the information is not being returned in the caller's buffer. The caller now needs to enumerate the files to find the changes."
    },
    270: {
        "hex": "0x0000010E",
        "id": "STATUS_PRIMARY_TRANSPORT_CONNECT_FAILED",
        "desc": "{Connect Failure on Primary Transport} An attempt was made to connect to the remote server %hs on the primary transport, but the connection failed. The computer WAS able to connect on a secondary transport."
    },
    273: {
        "hex": "0x00000111",
        "id": "STATUS_PAGE_FAULT_DEMAND_ZERO",
        "desc": "The page fault was a demand zero fault."
    },
    275: {
        "hex": "0x00000113",
        "id": "STATUS_PAGE_FAULT_GUARD_PAGE",
        "desc": "The page fault was a demand zero fault."
    },
    277: {
        "hex": "0x00000115",
        "id": "STATUS_CACHE_PAGE_LOCKED",
        "desc": "The cached page was locked during operation."
    },
    279: {
        "hex": "0x00000117",
        "id": "STATUS_BUFFER_ALL_ZEROS",
        "desc": "The specified buffer contains all zeros."
    },
    281: {
        "hex": "0x00000119",
        "id": "STATUS_RESOURCE_REQUIREMENTS_CHANGED",
        "desc": "The device has succeeded a query-stop and its resource requirements have changed."
    },
    289: {
        "hex": "0x00000121",
        "id": "STATUS_DS_MEMBERSHIP_EVALUATED_LOCALLY",
        "desc": "The directory service evaluated group memberships locally, because it was unable to contact a global catalog server."
    },
    291: {
        "hex": "0x00000123",
        "id": "STATUS_PROCESS_NOT_IN_JOB",
        "desc": "The specified process is not part of a job."
    },
    293: {
        "hex": "0x00000125",
        "id": "STATUS_VOLSNAP_HIBERNATE_READY",
        "desc": "{Volume Shadow Copy Service} The system is now ready for hibernation."
    },
    295: {
        "hex": "0x00000127",
        "id": "STATUS_INTERRUPT_VECTOR_ALREADY_CONNECTED",
        "desc": "The specified interrupt vector was already connected."
    },
    297: {
        "hex": "0x00000129",
        "id": "STATUS_PROCESS_CLONED",
        "desc": "The current process is a cloned process."
    },
    299: {
        "hex": "0x0000012B",
        "id": "STATUS_FILE_LOCKED_WITH_WRITERS",
        "desc": "The file was locked and at least one user of the file can write."
    },
    871: {
        "hex": "0x00000367",
        "id": "STATUS_WAIT_FOR_OPLOCK",
        "desc": "An operation is blocked and waiting for an oplock."
    },
    65538: {
        "hex": "0x00010002",
        "id": "DBG_CONTINUE",
        "desc": "The debugger continued."
    },
    1073741824: {
        "hex": "0x40000000",
        "id": "STATUS_OBJECT_NAME_EXISTS",
        "desc": "{Object Exists} An attempt was made to create an object but the object name already exists."
    },
    1073741826: {
        "hex": "0x40000002",
        "id": "STATUS_WORKING_SET_LIMIT_RANGE",
        "desc": "{Working Set Range Error} An attempt was made to set the working set minimum or maximum to values that are outside the allowable range."
    },
    1073741828: {
        "hex": "0x40000004",
        "id": "STATUS_RXACT_STATE_CREATED",
        "desc": "This informational level status indicates that a specified registry subtree transaction state did not yet exist and had to be created."
    },
    1073741830: {
        "hex": "0x40000006",
        "id": "STATUS_LOCAL_USER_SESSION_KEY",
        "desc": "{Local Session Key} A user session key was requested for a local remote procedure call (RPC) connection. The session key that is returned is a constant value and not unique to this connection."
    },
    1073741832: {
        "hex": "0x40000008",
        "id": "STATUS_SERIAL_MORE_WRITES",
        "desc": "{Serial IOCTL Complete} A serial I/O operation was completed by another write to a serial port. (The IOCTL_SERIAL_XOFF_COUNTER reached zero.)"
    },
    1073741834: {
        "hex": "0x4000000A",
        "id": "STATUS_FT_READ_RECOVERY_FROM_BACKUP",
        "desc": "{Redundant Read} To satisfy a read request, the Windows NT operating system fault-tolerant file system successfully read the requested data from a redundant copy. This was done because the file system encountered a failure on a member of the fault-tolerant volume but was unable to reassign the failing area of the device."
    },
    1073741836: {
        "hex": "0x4000000C",
        "id": "STATUS_SERIAL_COUNTER_TIMEOUT",
        "desc": "{Serial IOCTL Timeout} A serial I/O operation completed because the time-out period expired. (The IOCTL_SERIAL_XOFF_COUNTER had not reached zero.)"
    },
    1073741838: {
        "hex": "0x4000000E",
        "id": "STATUS_IMAGE_MACHINE_TYPE_MISMATCH",
        "desc": "{Machine Type Mismatch} The image file %hs is valid but is for a machine type other than the current machine. Select OK to continue, or CANCEL to fail the DLL load."
    },
    1073741840: {
        "hex": "0x40000010",
        "id": "STATUS_RECEIVE_EXPEDITED",
        "desc": "{Expedited Data Received} The network transport returned data to its client that was marked as expedited by the remote system."
    },
    1073741842: {
        "hex": "0x40000012",
        "id": "STATUS_EVENT_DONE",
        "desc": "{TDI Event Done} The TDI indication has completed successfully."
    },
    1073741844: {
        "hex": "0x40000014",
        "id": "STATUS_CHECKING_FILE_SYSTEM",
        "desc": "Checking file system on %wZ."
    },
    1073741846: {
        "hex": "0x40000016",
        "id": "STATUS_PREDEFINED_HANDLE",
        "desc": "The specified registry key is referenced by a predefined handle."
    },
    1073741848: {
        "hex": "0x40000018",
        "id": "STATUS_SERVICE_NOTIFICATION",
        "desc": "%hs"
    },
    1073741850: {
        "hex": "0x4000001A",
        "id": "STATUS_LOG_HARD_ERROR",
        "desc": "Application popup: %1 : %2"
    },
    1073741852: {
        "hex": "0x4000001C",
        "id": "STATUS_WX86_UNSIMULATE",
        "desc": "An exception status code that is used by the Win32 x86 emulation subsystem."
    },
    1073741854: {
        "hex": "0x4000001E",
        "id": "STATUS_WX86_SINGLE_STEP",
        "desc": "An exception status code that is used by the Win32 x86 emulation subsystem."
    },
    1073741856: {
        "hex": "0x40000020",
        "id": "STATUS_WX86_EXCEPTION_CONTINUE",
        "desc": "An exception status code that is used by the Win32 x86 emulation subsystem."
    },
    1073741858: {
        "hex": "0x40000022",
        "id": "STATUS_WX86_EXCEPTION_CHAIN",
        "desc": "An exception status code that is used by the Win32 x86 emulation subsystem."
    },
    1073741860: {
        "hex": "0x40000024",
        "id": "STATUS_NO_YIELD_PERFORMED",
        "desc": "A yield execution was performed and no thread was available to run."
    },
    1073741862: {
        "hex": "0x40000026",
        "id": "STATUS_ARBITRATION_UNHANDLED",
        "desc": "The arbiter has deferred arbitration of these resources to its parent."
    },
    1073741864: {
        "hex": "0x40000028",
        "id": "STATUS_WX86_CREATEWX86TIB",
        "desc": "An exception status code that is used by the Win32 x86 emulation subsystem."
    },
    1073741866: {
        "hex": "0x4000002A",
        "id": "STATUS_HIBERNATED",
        "desc": "The system was put into hibernation."
    },
    1073741868: {
        "hex": "0x4000002C",
        "id": "STATUS_FIRMWARE_UPDATED",
        "desc": "Windows has detected that the system firmware (BIOS) was updated [previous firmware date = %2, current firmware date %3]."
    },
    1073741870: {
        "hex": "0x4000002E",
        "id": "STATUS_MESSAGE_RETRIEVED",
        "desc": "The ALPC message being canceled has already been retrieved from the queue on the other side."
    },
    1073741872: {
        "hex": "0x40000030",
        "id": "STATUS_ALPC_CHECK_COMPLETION_LIST",
        "desc": "The receive operation was successful. Check the ALPC completion list for the received message."
    },
    1073741874: {
        "hex": "0x40000032",
        "id": "STATUS_ACCESS_AUDIT_BY_POLICY",
        "desc": "Access to %1 is monitored by policy rule %2."
    },
    1073741876: {
        "hex": "0x40000034",
        "id": "STATUS_BIZRULES_NOT_ENABLED",
        "desc": "Business rule scripts are disabled for the calling application."
    },
    1073742704: {
        "hex": "0x40000370",
        "id": "STATUS_DS_SHUTTING_DOWN",
        "desc": "The directory service is shutting down."
    },
    1073807362: {
        "hex": "0x40010002",
        "id": "DBG_UNABLE_TO_PROVIDE_HANDLE",
        "desc": "Debugger cannot provide a handle."
    },
    1073807364: {
        "hex": "0x40010004",
        "id": "DBG_TERMINATE_PROCESS",
        "desc": "Debugger terminated the process."
    },
    1073807366: {
        "hex": "0x40010006",
        "id": "DBG_PRINTEXCEPTION_C",
        "desc": "Debugger printed an exception on control C."
    },
    1073807368: {
        "hex": "0x40010008",
        "id": "DBG_CONTROL_BREAK",
        "desc": "Debugger received a control break."
    },
    1073872982: {
        "hex": "0x40020056",
        "id": "RPC_NT_UUID_LOCAL_ONLY",
        "desc": "A UUID that is valid only on this computer has been allocated."
    },
    1074397188: {
        "hex": "0x400A0004",
        "id": "STATUS_CTX_CDM_CONNECT",
        "desc": "The Client Drive Mapping Service has connected on Terminal Connection."
    },
    1075118093: {
        "hex": "0x4015000D",
        "id": "STATUS_SXS_RELEASE_ACTIVATION_CONTEXT",
        "desc": "A kernel mode component is releasing a reference on an activation context."
    },
    1075380277: {
        "hex": "0x40190035",
        "id": "STATUS_RM_ALREADY_STARTED",
        "desc": "The transactional resource manager has already been started."
    },
    1075511532: {
        "hex": "0x401B00EC",
        "id": "STATUS_VIDEO_DRIVER_DEBUG_REPORT_REQUEST",
        "desc": "{Display Driver Recovered From Failure} The %hs display driver has detected a failure and recovered from it. Some graphical operations might have failed. The next time you restart the machine, a dialog box appears, giving you an opportunity to upload data about this failure to Microsoft."
    },
    1075708183: {
        "hex": "0x401E0117",
        "id": "STATUS_GRAPHICS_DRIVER_MISMATCH",
        "desc": "The kernel driver detected a version mismatch between it and the user mode driver."
    },
    1075708702: {
        "hex": "0x401E031E",
        "id": "STATUS_GRAPHICS_NO_PREFERRED_MODE",
        "desc": "The specified mode set does not specify a preference for one of its modes."
    },
    1075708748: {
        "hex": "0x401E034C",
        "id": "STATUS_GRAPHICS_NO_MORE_ELEMENTS_IN_DATASET",
        "desc": "The specified dataset (for example, mode set, frequency range set, descriptor set, or topology) does not contain any more elements."
    },
    1075708975: {
        "hex": "0x401E042F",
        "id": "STATUS_GRAPHICS_UNKNOWN_CHILD_STATUS",
        "desc": "The child device presence was not reliably detected."
    },
    1075708985: {
        "hex": "0x401E0439",
        "id": "STATUS_GRAPHICS_POLLING_TOO_FREQUENTLY",
        "desc": "The display adapter is being polled for children too frequently at the same polling level."
    },
    1076035585: {
        "hex": "0x40230001",
        "id": "STATUS_NDIS_INDICATION_REQUIRED",
        "desc": "The request will be completed later by an NDIS status indication."
    },
    2147483650: {
        "hex": "0x80000002",
        "id": "STATUS_DATATYPE_MISALIGNMENT",
        "desc": "{EXCEPTION} Alignment Fault A data type misalignment was detected in a load or store instruction."
    },
    2147483652: {
        "hex": "0x80000004",
        "id": "STATUS_SINGLE_STEP",
        "desc": "{EXCEPTION} Single Step A single step or trace operation has just been completed."
    },
    2147483654: {
        "hex": "0x80000006",
        "id": "STATUS_NO_MORE_FILES",
        "desc": "{No More Files} No more files were found which match the file specification."
    },
    2147483658: {
        "hex": "0x8000000A",
        "id": "STATUS_HANDLES_CLOSED",
        "desc": "{Handles Closed} Handles to objects have been automatically closed because of the requested operation."
    },
    2147483660: {
        "hex": "0x8000000C",
        "id": "STATUS_GUID_SUBSTITUTION_MADE",
        "desc": "{GUID Substitution} During the translation of a globally unique identifier (GUID) to a Windows security ID (SID), no administratively defined GUID prefix was found. A substitute prefix was used, which will not compromise system security. However, this might provide a more restrictive access than intended."
    },
    2147483662: {
        "hex": "0x8000000E",
        "id": "STATUS_DEVICE_PAPER_EMPTY",
        "desc": "{Out of Paper} The printer is out of paper."
    },
    2147483664: {
        "hex": "0x80000010",
        "id": "STATUS_DEVICE_OFF_LINE",
        "desc": "{Device Offline} The printer has been taken offline."
    },
    2147483666: {
        "hex": "0x80000012",
        "id": "STATUS_NO_MORE_EAS",
        "desc": "{No More EAs} No more extended attributes (EAs) were found for the file."
    },
    2147483668: {
        "hex": "0x80000014",
        "id": "STATUS_EA_LIST_INCONSISTENT",
        "desc": "{Inconsistent EA List} The extended attribute (EA) list is inconsistent."
    },
    2147483670: {
        "hex": "0x80000016",
        "id": "STATUS_VERIFY_REQUIRED",
        "desc": "{Verifying Disk} The media has changed and a verify operation is in progress; therefore, no reads or writes can be performed to the device, except those that are used in the verify operation."
    },
    2147483672: {
        "hex": "0x80000018",
        "id": "STATUS_RXACT_COMMIT_NECESSARY",
        "desc": "This warning level status indicates that the transaction state already exists for the registry subtree, but that a transaction commit was previously aborted. The commit has NOT been completed but has not been rolled back either; therefore, it can still be committed, if needed."
    },
    2147483675: {
        "hex": "0x8000001B",
        "id": "STATUS_FILEMARK_DETECTED",
        "desc": "{Filemark Found} A filemark was detected."
    },
    2147483677: {
        "hex": "0x8000001D",
        "id": "STATUS_BUS_RESET",
        "desc": "{I/O Bus Reset} An I/O bus reset was detected."
    },
    2147483679: {
        "hex": "0x8000001F",
        "id": "STATUS_BEGINNING_OF_MEDIA",
        "desc": "The beginning of a tape or partition has been detected."
    },
    2147483681: {
        "hex": "0x80000021",
        "id": "STATUS_SETMARK_DETECTED",
        "desc": "A tape access reached a set mark."
    },
    2147483683: {
        "hex": "0x80000023",
        "id": "STATUS_REDIRECTOR_HAS_OPEN_HANDLES",
        "desc": "The redirector is in use and cannot be unloaded."
    },
    2147483685: {
        "hex": "0x80000025",
        "id": "STATUS_ALREADY_DISCONNECTED",
        "desc": "The specified connection has already been disconnected."
    },
    2147483687: {
        "hex": "0x80000027",
        "id": "STATUS_CLEANER_CARTRIDGE_INSTALLED",
        "desc": "A cleaner cartridge is present in the tape library."
    },
    2147483689: {
        "hex": "0x80000029",
        "id": "STATUS_UNWIND_CONSOLIDATE",
        "desc": "A frame consolidation has been executed."
    },
    2147483691: {
        "hex": "0x8000002B",
        "id": "STATUS_DLL_MIGHT_BE_INSECURE",
        "desc": "The application is attempting to run executable code from the module %hs. This might be insecure. An alternative, %hs, is available. Should the application use the secure module %hs?"
    },
    2147483693: {
        "hex": "0x8000002D",
        "id": "STATUS_STOPPED_ON_SYMLINK",
        "desc": "The create operation stopped after reaching a symbolic link."
    },
    2147484297: {
        "hex": "0x80000289",
        "id": "STATUS_DEVICE_DOOR_OPEN",
        "desc": "The device has indicated that its door is open. Further operations require it closed and secured."
    },
    2147549185: {
        "hex": "0x80010001",
        "id": "DBG_EXCEPTION_NOT_HANDLED",
        "desc": "Debugger did not handle the exception."
    },
    2148728834: {
        "hex": "0x80130002",
        "id": "STATUS_CLUSTER_NODE_ALREADY_DOWN",
        "desc": "The cluster node is already down."
    },
    2148728836: {
        "hex": "0x80130004",
        "id": "STATUS_CLUSTER_NETWORK_ALREADY_OFFLINE",
        "desc": "The cluster network is already offline."
    },
    2149122057: {
        "hex": "0x80190009",
        "id": "STATUS_COULD_NOT_RESIZE_LOG",
        "desc": "The log could not be set to the requested size."
    },
    2149122097: {
        "hex": "0x80190031",
        "id": "STATUS_CANT_RECOVER_WITH_HANDLE_OPEN",
        "desc": "The file cannot be recovered because there is a handle still open on it."
    },
    2149122114: {
        "hex": "0x80190042",
        "id": "STATUS_TRANSACTION_SCOPE_CALLBACKS_NOT_SET",
        "desc": "A transaction scope could not be entered because the scope handler has not been initialized."
    },
    2149318657: {
        "hex": "0x801C0001",
        "id": "STATUS_FLT_BUFFER_TOO_SMALL",
        "desc": "{Buffer too small} The buffer is too small to contain the entry. No information has been written to the buffer."
    },
    2149646338: {
        "hex": "0x80210002",
        "id": "STATUS_FVE_TRANSIENT_STATE",
        "desc": "BitLocker encryption keys were ignored because the volume was in a transient state."
    },
    3221225474: {
        "hex": "0xC0000002",
        "id": "STATUS_NOT_IMPLEMENTED",
        "desc": "{Not Implemented} The requested operation is not implemented."
    },
    3221225476: {
        "hex": "0xC0000004",
        "id": "STATUS_INFO_LENGTH_MISMATCH",
        "desc": "The specified information record length does not match the length that is required for the specified information class."
    },
    3221225478: {
        "hex": "0xC0000006",
        "id": "STATUS_IN_PAGE_ERROR",
        "desc": "The instruction at 0x%08lx referenced memory at 0x%08lx. The required data was not placed into memory because of an I/O error status of 0x%08lx."
    },
    3221225480: {
        "hex": "0xC0000008",
        "id": "STATUS_INVALID_HANDLE",
        "desc": "An invalid HANDLE was specified."
    },
    3221225482: {
        "hex": "0xC000000A",
        "id": "STATUS_BAD_INITIAL_PC",
        "desc": "An invalid initial start address was specified in a call to NtCreateThread."
    },
    3221225484: {
        "hex": "0xC000000C",
        "id": "STATUS_TIMER_NOT_CANCELED",
        "desc": "An attempt was made to cancel or set a timer that has an associated APC and the specified thread is not the thread that originally set the timer with an associated APC routine."
    },
    3221225486: {
        "hex": "0xC000000E",
        "id": "STATUS_NO_SUCH_DEVICE",
        "desc": "A device that does not exist was specified."
    },
    3221225488: {
        "hex": "0xC0000010",
        "id": "STATUS_INVALID_DEVICE_REQUEST",
        "desc": "The specified request is not a valid operation for the target device."
    },
    3221225490: {
        "hex": "0xC0000012",
        "id": "STATUS_WRONG_VOLUME",
        "desc": "{Wrong Volume} The wrong volume is in the drive. Insert volume %hs into drive %hs."
    },
    3221225492: {
        "hex": "0xC0000014",
        "id": "STATUS_UNRECOGNIZED_MEDIA",
        "desc": "{Unknown Disk Format} The disk in drive %hs is not formatted properly. Check the disk, and reformat it, if needed."
    },
    3221225494: {
        "hex": "0xC0000016",
        "id": "STATUS_MORE_PROCESSING_REQUIRED",
        "desc": "{Still Busy} The specified I/O request packet (IRP) cannot be disposed of because the I/O operation is not complete."
    },
    3221225496: {
        "hex": "0xC0000018",
        "id": "STATUS_CONFLICTING_ADDRESSES",
        "desc": "{Conflicting Address Range} The specified address range conflicts with the address space."
    },
    3221225498: {
        "hex": "0xC000001A",
        "id": "STATUS_UNABLE_TO_FREE_VM",
        "desc": "The virtual memory cannot be freed."
    },
    3221225500: {
        "hex": "0xC000001C",
        "id": "STATUS_INVALID_SYSTEM_SERVICE",
        "desc": "An invalid system service was specified in a system service call."
    },
    3221225502: {
        "hex": "0xC000001E",
        "id": "STATUS_INVALID_LOCK_SEQUENCE",
        "desc": "{Invalid Lock Sequence} An attempt was made to execute an invalid lock sequence."
    },
    3221225504: {
        "hex": "0xC0000020",
        "id": "STATUS_INVALID_FILE_FOR_SECTION",
        "desc": "{Bad File} The attributes of the specified mapping file for a section of memory cannot be read."
    },
    3221225506: {
        "hex": "0xC0000022",
        "id": "STATUS_ACCESS_DENIED",
        "desc": "{Access Denied} A process has requested access to an object but has not been granted those access rights."
    },
    3221225508: {
        "hex": "0xC0000024",
        "id": "STATUS_OBJECT_TYPE_MISMATCH",
        "desc": "{Wrong Type} There is a mismatch between the type of object that is required by the requested operation and the type of object that is specified in the request."
    },
    3221225510: {
        "hex": "0xC0000026",
        "id": "STATUS_INVALID_DISPOSITION",
        "desc": "An invalid exception disposition was returned by an exception handler."
    },
    3221225512: {
        "hex": "0xC0000028",
        "id": "STATUS_BAD_STACK",
        "desc": "An invalid or unaligned stack was encountered during an unwind operation."
    },
    3221225514: {
        "hex": "0xC000002A",
        "id": "STATUS_NOT_LOCKED",
        "desc": "An attempt was made to unlock a page of memory that was not locked."
    },
    3221225516: {
        "hex": "0xC000002C",
        "id": "STATUS_UNABLE_TO_DECOMMIT_VM",
        "desc": "An attempt was made to decommit uncommitted virtual memory."
    },
    3221225518: {
        "hex": "0xC000002E",
        "id": "STATUS_INVALID_PORT_ATTRIBUTES",
        "desc": "Invalid object attributes specified to NtCreatePort or invalid port attributes specified to NtConnectPort."
    },
    3221225520: {
        "hex": "0xC0000030",
        "id": "STATUS_INVALID_PARAMETER_MIX",
        "desc": "An invalid combination of parameters was specified."
    },
    3221225522: {
        "hex": "0xC0000032",
        "id": "STATUS_DISK_CORRUPT_ERROR",
        "desc": "{Corrupt Disk} The file system structure on the disk is corrupt and unusable. Run the Chkdsk utility on the volume %hs."
    },
    3221225524: {
    "hex": "0xC0000034",
    "id": "STATUS_OBJECT_NAME_NOT_FOUND",
    "desc": "The object name is not found."
    },
    3221225527: {
        "hex": "0xC0000037",
        "id": "STATUS_PORT_DISCONNECTED",
        "desc": "An attempt was made to send a message to a disconnected communication port."
    },
    3221225529: {
        "hex": "0xC0000039",
        "id": "STATUS_OBJECT_PATH_INVALID",
        "desc": "The object path component was not a directory object."
    },
    3221225531: {
        "hex": "0xC000003B",
        "id": "STATUS_OBJECT_PATH_SYNTAX_BAD",
        "desc": "The object path component was not a directory object."
    },
    3221225533: {
        "hex": "0xC000003D",
        "id": "STATUS_DATA_LATE_ERROR",
        "desc": "{Data Late} A data late error occurred."
    },
    3221225535: {
        "hex": "0xC000003F",
        "id": "STATUS_CRC_ERROR",
        "desc": "{Bad CRC} A cyclic redundancy check (CRC) checksum error occurred."
    },
    3221225537: {
        "hex": "0xC0000041",
        "id": "STATUS_PORT_CONNECTION_REFUSED",
        "desc": "The NtConnectPort request is refused."
    },
    3221225539: {
        "hex": "0xC0000043",
        "id": "STATUS_SHARING_VIOLATION",
        "desc": "A file cannot be opened because the share access flags are incompatible."
    },
    3221225541: {
        "hex": "0xC0000045",
        "id": "STATUS_INVALID_PAGE_PROTECTION",
        "desc": "The specified page protection was not valid."
    },
    3221225543: {
        "hex": "0xC0000047",
        "id": "STATUS_SEMAPHORE_LIMIT_EXCEEDED",
        "desc": "An attempt was made to release a semaphore such that its maximum count would have been exceeded."
    },
    3221225545: {
        "hex": "0xC0000049",
        "id": "STATUS_SECTION_NOT_IMAGE",
        "desc": "An attempt was made to query image information on a section that does not map an image."
    },
    3221225547: {
        "hex": "0xC000004B",
        "id": "STATUS_THREAD_IS_TERMINATING",
        "desc": "An attempt was made to suspend a thread that has begun termination."
    },
    3221225549: {
        "hex": "0xC000004D",
        "id": "STATUS_INCOMPATIBLE_FILE_MAP",
        "desc": "A section was created to map a file that is not compatible with an already existing section that maps the same file."
    },
    3221225551: {
        "hex": "0xC000004F",
        "id": "STATUS_EAS_NOT_SUPPORTED",
        "desc": "An operation involving EAs failed because the file system does not support EAs."
    },
    3221225553: {
        "hex": "0xC0000051",
        "id": "STATUS_NONEXISTENT_EA_ENTRY",
        "desc": "An EA operation failed because the name or EA index is invalid."
    },
    3221225555: {
        "hex": "0xC0000053",
        "id": "STATUS_EA_CORRUPT_ERROR",
        "desc": "The EA is corrupt and cannot be read."
    },
    3221225557: {
        "hex": "0xC0000055",
        "id": "STATUS_LOCK_NOT_GRANTED",
        "desc": "A requested file lock cannot be granted due to other existing locks."
    },
    3221225559: {
        "hex": "0xC0000057",
        "id": "STATUS_CTL_FILE_NOT_SUPPORTED",
        "desc": "An attempt was made to set the control attribute on a file. This attribute is not supported in the destination file system."
    },
    3221225561: {
        "hex": "0xC0000059",
        "id": "STATUS_REVISION_MISMATCH",
        "desc": "Indicates that two revision levels are incompatible."
    },
    3221225563: {
        "hex": "0xC000005B",
        "id": "STATUS_INVALID_PRIMARY_GROUP",
        "desc": "Indicates a particular security ID cannot be assigned as the primary group of an object."
    },
    3221225565: {
        "hex": "0xC000005D",
        "id": "STATUS_CANT_DISABLE_MANDATORY",
        "desc": "A mandatory group cannot be disabled."
    },
    3221225567: {
        "hex": "0xC000005F",
        "id": "STATUS_NO_SUCH_LOGON_SESSION",
        "desc": "A specified logon session does not exist. It might already have been terminated."
    },
    3221225569: {
        "hex": "0xC0000061",
        "id": "STATUS_PRIVILEGE_NOT_HELD",
        "desc": "A required privilege is not held by the client."
    },
    3221225571: {
        "hex": "0xC0000063",
        "id": "STATUS_USER_EXISTS",
        "desc": "The specified account already exists."
    },
    3221225573: {
        "hex": "0xC0000065",
        "id": "STATUS_GROUP_EXISTS",
        "desc": "The specified group already exists."
    },
    3221225575: {
        "hex": "0xC0000067",
        "id": "STATUS_MEMBER_IN_GROUP",
        "desc": "The specified user account is already in the specified group account. Also used to indicate a group cannot be deleted because it contains a member."
    },
    3221225577: {
        "hex": "0xC0000069",
        "id": "STATUS_LAST_ADMIN",
        "desc": "Indicates the requested operation would disable or delete the last remaining administration account. This is not allowed to prevent creating a situation in which the system cannot be administrated."
    },
    3221225579: {
        "hex": "0xC000006B",
        "id": "STATUS_ILL_FORMED_PASSWORD",
        "desc": "When trying to update a password, this return status indicates that the value provided for the new password contains values that are not allowed in passwords."
    },
    3221225581: {
        "hex": "0xC000006D",
        "id": "STATUS_LOGON_FAILURE",
        "desc": "The attempted logon is invalid. This is either due to a bad username or authentication information."
    },
    3221225583: {
        "hex": "0xC000006F",
        "id": "STATUS_INVALID_LOGON_HOURS",
        "desc": "The user account has time restrictions and cannot be logged onto at this time."
    },
    3221225585: {
        "hex": "0xC0000071",
        "id": "STATUS_PASSWORD_EXPIRED",
        "desc": "The user account password has expired."
    },
    3221225587: {
        "hex": "0xC0000073",
        "id": "STATUS_NONE_MAPPED",
        "desc": "None of the information to be translated has been translated."
    },
    3221225589: {
        "hex": "0xC0000075",
        "id": "STATUS_LUIDS_EXHAUSTED",
        "desc": "Indicates there are no more LUIDs to allocate."
    },
    3221225591: {
        "hex": "0xC0000077",
        "id": "STATUS_INVALID_ACL",
        "desc": "Indicates the ACL structure is not valid."
    },
    3221225593: {
        "hex": "0xC0000079",
        "id": "STATUS_INVALID_SECURITY_DESCR",
        "desc": "Indicates the SECURITY_DESCRIPTOR structure is not valid."
    },
    3221225595: {
        "hex": "0xC000007B",
        "id": "STATUS_INVALID_IMAGE_FORMAT",
        "desc": "{Bad Image} %hs is either not designed to run on Windows or it contains an error. Try installing the program again using the original installation media or contact your system administrator or the software vendor for support."
    },
    3221225597: {
        "hex": "0xC000007D",
        "id": "STATUS_BAD_INHERITANCE_ACL",
        "desc": "Indicates that an attempt to build either an inherited ACL or ACE was not successful. This can be caused by a number of things. One of the more probable causes is the replacement of a CreatorId with a SID that did not fit into the ACE or ACL."
    },
    3221225599: {
        "hex": "0xC000007F",
        "id": "STATUS_DISK_FULL",
        "desc": "An operation failed because the disk was full."
    },
    3221225601: {
        "hex": "0xC0000081",
        "id": "STATUS_SERVER_NOT_DISABLED",
        "desc": "The GUID allocation server is enabled at the moment."
    },
    3221225603: {
        "hex": "0xC0000083",
        "id": "STATUS_GUIDS_EXHAUSTED",
        "desc": "The GUIDs could not be allocated because the Authority Agent was exhausted."
    },
    3221225605: {
        "hex": "0xC0000085",
        "id": "STATUS_AGENTS_EXHAUSTED",
        "desc": "No more authority agent values are available for the particular identifier authority value."
    },
    3221225607: {
        "hex": "0xC0000087",
        "id": "STATUS_SECTION_NOT_EXTENDED",
        "desc": "A mapped section could not be extended."
    },
    3221225609: {
        "hex": "0xC0000089",
        "id": "STATUS_RESOURCE_DATA_NOT_FOUND",
        "desc": "Indicates the specified image file did not contain a resource section."
    },
    3221225611: {
        "hex": "0xC000008B",
        "id": "STATUS_RESOURCE_NAME_NOT_FOUND",
        "desc": "Indicates the specified resource name cannot be found in the image file."
    },
    3221225613: {
        "hex": "0xC000008D",
        "id": "STATUS_FLOAT_DENORMAL_OPERAND",
        "desc": "{EXCEPTION} Floating-point denormal operand."
    },
    3221225615: {
        "hex": "0xC000008F",
        "id": "STATUS_FLOAT_INEXACT_RESULT",
        "desc": "{EXCEPTION} Floating-point inexact result."
    },
    3221225617: {
        "hex": "0xC0000091",
        "id": "STATUS_FLOAT_OVERFLOW",
        "desc": "{EXCEPTION} Floating-point overflow."
    },
    3221225619: {
        "hex": "0xC0000093",
        "id": "STATUS_FLOAT_UNDERFLOW",
        "desc": "{EXCEPTION} Floating-point underflow."
    },
    3221225621: {
        "hex": "0xC0000095",
        "id": "STATUS_INTEGER_OVERFLOW",
        "desc": "{EXCEPTION} Integer overflow."
    },
    3221225623: {
        "hex": "0xC0000097",
        "id": "STATUS_TOO_MANY_PAGING_FILES",
        "desc": "An attempt was made to install more paging files than the system supports."
    },
    3221225625: {
        "hex": "0xC0000099",
        "id": "STATUS_ALLOTTED_SPACE_EXCEEDED",
        "desc": "When a block of memory is allotted for future updates, such as the memory allocated to hold discretionary access control and primary group information, successive updates might exceed the amount of memory originally allotted. Because a quota might already have been charged to several processes that have handles to the object, it is not reasonable to alter the size of the allocated memory. Instead, a request that requires more memory than has been allotted must fail and the STATUS_ALLOTTED_SPACE_EXCEEDED error returned."
    },
    3221225627: {
        "hex": "0xC000009B",
        "id": "STATUS_DFS_EXIT_PATH_FOUND",
        "desc": "An attempt has been made to open a DFS exit path control file."
    },
    3221225629: {
        "hex": "0xC000009D",
        "id": "STATUS_DEVICE_NOT_CONNECTED",
        "desc": "There is bad cabling, non-termination, or the controller is not able to obtain access to the hard disk."
    },
    3221225632: {
        "hex": "0xC00000A0",
        "id": "STATUS_MEMORY_NOT_ALLOCATED",
        "desc": "An attempt was made to free virtual memory that is not allocated."
    },
    3221225634: {
        "hex": "0xC00000A2",
        "id": "STATUS_MEDIA_WRITE_PROTECTED",
        "desc": "{Write Protect Error} The disk cannot be written to because it is write-protected. Remove the write protection from the volume %hs in drive %hs."
    },
    3221225636: {
        "hex": "0xC00000A4",
        "id": "STATUS_INVALID_GROUP_ATTRIBUTES",
        "desc": "The specified attributes are invalid or are incompatible with the attributes for the group as a whole."
    },
    3221225638: {
        "hex": "0xC00000A6",
        "id": "STATUS_CANT_OPEN_ANONYMOUS",
        "desc": "An attempt was made to open an anonymous-level token. Anonymous tokens cannot be opened."
    },
    3221225640: {
        "hex": "0xC00000A8",
        "id": "STATUS_BAD_TOKEN_TYPE",
        "desc": "The type of a token object is inappropriate for its attempted use."
    },
    3221225642: {
        "hex": "0xC00000AA",
        "id": "STATUS_INSTRUCTION_MISALIGNMENT",
        "desc": "An attempt was made to execute an instruction at an unaligned address and the host system does not support unaligned instruction references."
    },
    3221225644: {
        "hex": "0xC00000AC",
        "id": "STATUS_PIPE_NOT_AVAILABLE",
        "desc": "An instance of a named pipe cannot be found in the listening state."
    },
    3221225646: {
        "hex": "0xC00000AE",
        "id": "STATUS_PIPE_BUSY",
        "desc": "The specified pipe is set to complete operations and there are current I/O operations queued so that it cannot be changed to queue operations."
    },
    3221225648: {
        "hex": "0xC00000B0",
        "id": "STATUS_PIPE_DISCONNECTED",
        "desc": "The specified named pipe is in the disconnected state."
    },
    3221225650: {
        "hex": "0xC00000B2",
        "id": "STATUS_PIPE_CONNECTED",
        "desc": "The specified named pipe is in the connected state."
    },
    3221225652: {
        "hex": "0xC00000B4",
        "id": "STATUS_INVALID_READ_MODE",
        "desc": "The specified named pipe is not in message mode."
    },
    3221225654: {
        "hex": "0xC00000B6",
        "id": "STATUS_FILE_FORCED_CLOSED",
        "desc": "The specified file has been closed by another process."
    },
    3221225656: {
        "hex": "0xC00000B8",
        "id": "STATUS_PROFILING_NOT_STOPPED",
        "desc": "Profiling is not stopped."
    },
    3221225658: {
        "hex": "0xC00000BA",
        "id": "STATUS_FILE_IS_A_DIRECTORY",
        "desc": "The file that was specified as a target is a directory, and the caller specified that it could be anything but a directory."
    },
    3221225660: {
        "hex": "0xC00000BC",
        "id": "STATUS_REMOTE_NOT_LISTENING",
        "desc": "This remote computer is not listening."
    },
    3221225662: {
        "hex": "0xC00000BE",
        "id": "STATUS_BAD_NETWORK_PATH",
        "desc": "The network path cannot be located."
    },
    3221225664: {
        "hex": "0xC00000C0",
        "id": "STATUS_DEVICE_DOES_NOT_EXIST",
        "desc": "This device does not exist."
    },
    3221225666: {
        "hex": "0xC00000C2",
        "id": "STATUS_ADAPTER_HARDWARE_ERROR",
        "desc": "An I/O adapter hardware error has occurred."
    },
    3221225668: {
        "hex": "0xC00000C4",
        "id": "STATUS_UNEXPECTED_NETWORK_ERROR",
        "desc": "An unexpected network error occurred."
    },
    3221225670: {
        "hex": "0xC00000C6",
        "id": "STATUS_PRINT_QUEUE_FULL",
        "desc": "The print queue is full."
    },
    3221225672: {
        "hex": "0xC00000C8",
        "id": "STATUS_PRINT_CANCELLED",
        "desc": "The requested print file has been canceled."
    },
    3221225674: {
        "hex": "0xC00000CA",
        "id": "STATUS_NETWORK_ACCESS_DENIED",
        "desc": "Network access is denied."
    },
    3221225676: {
        "hex": "0xC00000CC",
        "id": "STATUS_BAD_NETWORK_NAME",
        "desc": "{Network Name Not Found} The specified share name cannot be found on the remote server."
    },
    3221225678: {
        "hex": "0xC00000CE",
        "id": "STATUS_TOO_MANY_SESSIONS",
        "desc": "The network BIOS session limit was exceeded."
    },
    3221225680: {
        "hex": "0xC00000D0",
        "id": "STATUS_REQUEST_NOT_ACCEPTED",
        "desc": "No more connections can be made to this remote computer at this time because the computer has already accepted the maximum number of connections."
    },
    3221225682: {
        "hex": "0xC00000D2",
        "id": "STATUS_NET_WRITE_FAULT",
        "desc": "A network data fault occurred."
    },
    3221225684: {
        "hex": "0xC00000D4",
        "id": "STATUS_NOT_SAME_DEVICE",
        "desc": "{Incorrect Volume} The destination file of a rename request is located on a different device than the source of the rename request."
    },
    3221225686: {
        "hex": "0xC00000D6",
        "id": "STATUS_VIRTUAL_CIRCUIT_CLOSED",
        "desc": "{Network Request Timeout} The session with a remote server has been disconnected because the time-out interval for a request has expired."
    },
    3221225688: {
        "hex": "0xC00000D8",
        "id": "STATUS_CANT_WAIT",
        "desc": "Used to indicate that an operation cannot continue without blocking for I/O."
    },
    3221225690: {
        "hex": "0xC00000DA",
        "id": "STATUS_CANT_ACCESS_DOMAIN_INFO",
        "desc": "Configuration information could not be read from the domain controller, either because the machine is unavailable or access has been denied."
    },
    3221225692: {
        "hex": "0xC00000DC",
        "id": "STATUS_INVALID_SERVER_STATE",
        "desc": "Indicates the Sam Server was in the wrong state to perform the desired operation."
    },
    3221225694: {
        "hex": "0xC00000DE",
        "id": "STATUS_INVALID_DOMAIN_ROLE",
        "desc": "This operation is only allowed for the primary domain controller of the domain."
    },
    3221225696: {
        "hex": "0xC00000E0",
        "id": "STATUS_DOMAIN_EXISTS",
        "desc": "The specified domain already exists."
    },
    3221225698: {
        "hex": "0xC00000E2",
        "id": "STATUS_OPLOCK_NOT_GRANTED",
        "desc": "An error status returned when the opportunistic lock (oplock) request is denied."
    },
    3221225700: {
        "hex": "0xC00000E4",
        "id": "STATUS_INTERNAL_DB_CORRUPTION",
        "desc": "This error indicates that the requested operation cannot be completed due to a catastrophic media failure or an on-disk data structure corruption."
    },
    3221225702: {
        "hex": "0xC00000E6",
        "id": "STATUS_GENERIC_NOT_MAPPED",
        "desc": "Indicates generic access types were contained in an access mask which should already be mapped to non-generic access types."
    },
    3221225704: {
        "hex": "0xC00000E8",
        "id": "STATUS_INVALID_USER_BUFFER",
        "desc": "An access to a user buffer failed at an expected point in time. This code is defined because the caller does not want to accept STATUS_ACCESS_VIOLATION in its filter."
    },
    3221225706: {
        "hex": "0xC00000EA",
        "id": "STATUS_UNEXPECTED_MM_CREATE_ERR",
        "desc": "If an MM error that is not defined in the standard FsRtl filter is returned, it is converted to one of the following errors, which are guaranteed to be in the filter. In this case, information is lost; however, the filter correctly handles the exception."
    },
    3221225708: {
        "hex": "0xC00000EC",
        "id": "STATUS_UNEXPECTED_MM_EXTEND_ERR",
        "desc": "If an MM error that is not defined in the standard FsRtl filter is returned, it is converted to one of the following errors, which are guaranteed to be in the filter. In this case, information is lost; however, the filter correctly handles the exception."
    },
    3221225710: {
        "hex": "0xC00000EE",
        "id": "STATUS_LOGON_SESSION_EXISTS",
        "desc": "An attempt has been made to start a new session manager or LSA logon session by using an ID that is already in use."
    },
    3221225712: {
        "hex": "0xC00000F0",
        "id": "STATUS_INVALID_PARAMETER_2",
        "desc": "An invalid parameter was passed to a service or function as the second argument."
    },
    3221225714: {
        "hex": "0xC00000F2",
        "id": "STATUS_INVALID_PARAMETER_4",
        "desc": "An invalid parameter was passed to a service or function as the fourth argument."
    },
    3221225716: {
        "hex": "0xC00000F4",
        "id": "STATUS_INVALID_PARAMETER_6",
        "desc": "An invalid parameter was passed to a service or function as the sixth argument."
    },
    3221225718: {
        "hex": "0xC00000F6",
        "id": "STATUS_INVALID_PARAMETER_8",
        "desc": "An invalid parameter was passed to a service or function as the eighth argument."
    },
    3221225720: {
        "hex": "0xC00000F8",
        "id": "STATUS_INVALID_PARAMETER_10",
        "desc": "An invalid parameter was passed to a service or function as the tenth argument."
    },
    3221225722: {
        "hex": "0xC00000FA",
        "id": "STATUS_INVALID_PARAMETER_12",
        "desc": "An invalid parameter was passed to a service or function as the twelfth argument."
    },
    3221225724: {
        "hex": "0xC00000FC",
        "id": "STATUS_REDIRECTOR_STARTED",
        "desc": "An attempt was made to start the redirector, but the redirector has already been started."
    },
    3221225726: {
        "hex": "0xC00000FE",
        "id": "STATUS_NO_SUCH_PACKAGE",
        "desc": "A specified authentication package is unknown."
    },
    3221225728: {
        "hex": "0xC0000100",
        "id": "STATUS_VARIABLE_NOT_FOUND",
        "desc": "Indicates the specified environment variable name was not found in the specified environment block."
    },
    3221225730: {
        "hex": "0xC0000102",
        "id": "STATUS_FILE_CORRUPT_ERROR",
        "desc": "{Corrupt File} The file or directory %hs is corrupt and unreadable. Run the Chkdsk utility."
    },
    3221225732: {
        "hex": "0xC0000104",
        "id": "STATUS_BAD_LOGON_SESSION_STATE",
        "desc": "The logon session is not in a state that is consistent with the requested operation."
    },
    3221225734: {
        "hex": "0xC0000106",
        "id": "STATUS_NAME_TOO_LONG",
        "desc": "A specified name string is too long for its intended use."
    },
    3221225736: {
        "hex": "0xC0000108",
        "id": "STATUS_CONNECTION_IN_USE",
        "desc": "The user attempted to force close the files on a redirected drive, but there were opened directories on the drive, and the user did not specify a sufficient level of force."
    },
    3221225738: {
        "hex": "0xC000010A",
        "id": "STATUS_PROCESS_IS_TERMINATING",
        "desc": "An attempt was made to duplicate an object handle into or out of an exiting process."
    },
    3221225740: {
        "hex": "0xC000010C",
        "id": "STATUS_NO_GUID_TRANSLATION",
        "desc": "Indicates that an attempt was made to assign protection to a file system file or directory and one of the SIDs in the security descriptor could not be translated into a GUID that could be stored by the file system. This causes the protection attempt to fail, which might cause a file creation attempt to fail."
    },
    3221225742: {
        "hex": "0xC000010E",
        "id": "STATUS_IMAGE_ALREADY_LOADED",
        "desc": "Indicates that the specified image is already loaded."
    },
    3221225752: {
        "hex": "0xC0000118",
        "id": "STATUS_INVALID_LDT_SIZE",
        "desc": "Indicates that an attempt was made to grow an LDT by setting its size, or that the size was not an even number of selectors."
    },
    3221225754: {
        "hex": "0xC000011A",
        "id": "STATUS_INVALID_LDT_DESCRIPTOR",
        "desc": "Indicates that the user supplied an invalid descriptor when trying to set up LDT descriptors."
    },
    3221225756: {
        "hex": "0xC000011C",
        "id": "STATUS_RXACT_INVALID_STATE",
        "desc": "Indicates that the transaction state of a registry subtree is incompatible with the requested operation. For example, a request has been made to start a new transaction with one already in progress, or a request has been made to apply a transaction when one is not currently in progress."
    },
    3221225758: {
        "hex": "0xC000011E",
        "id": "STATUS_MAPPED_FILE_SIZE_ZERO",
        "desc": "An attempt was made to map a file of size zero with the maximum size specified as zero."
    },
    3221225760: {
        "hex": "0xC0000120",
        "id": "STATUS_CANCELLED",
        "desc": "The I/O request was canceled."
    },
    3221225762: {
        "hex": "0xC0000122",
        "id": "STATUS_INVALID_COMPUTER_NAME",
        "desc": "Indicates a name that was specified as a remote computer name is syntactically invalid."
    },
    3221225764: {
        "hex": "0xC0000124",
        "id": "STATUS_SPECIAL_ACCOUNT",
        "desc": "Indicates an operation that is incompatible with built-in accounts has been attempted on a built-in (special) SAM account. For example, built-in accounts cannot be deleted."
    },
    3221225766: {
        "hex": "0xC0000126",
        "id": "STATUS_SPECIAL_USER",
        "desc": "The operation requested cannot be performed on the specified user because it is a built-in special user."
    },
    3221225768: {
        "hex": "0xC0000128",
        "id": "STATUS_FILE_CLOSED",
        "desc": "An I/O request other than close and several other special case operations was attempted using a file object that had already been closed."
    },
    3221225770: {
        "hex": "0xC000012A",
        "id": "STATUS_THREAD_NOT_IN_PROCESS",
        "desc": "An attempt was made to operate on a thread within a specific process, but the specified thread is not in the specified process."
    },
    3221225772: {
        "hex": "0xC000012C",
        "id": "STATUS_PAGEFILE_QUOTA_EXCEEDED",
        "desc": "The page file quota was exceeded."
    },
    3221225774: {
        "hex": "0xC000012E",
        "id": "STATUS_INVALID_IMAGE_LE_FORMAT",
        "desc": "The specified image file did not have the correct format: it appears to be LE format."
    },
    3221225776: {
        "hex": "0xC0000130",
        "id": "STATUS_INVALID_IMAGE_PROTECT",
        "desc": "The specified image file did not have the correct format: it did not have a proper e_lfarlc in the MZ header."
    },
    3221225778: {
        "hex": "0xC0000132",
        "id": "STATUS_LOGON_SERVER_CONFLICT",
        "desc": "The Netlogon service cannot start because another Netlogon service running in the domain conflicts with the specified role."
    },
    3221225780: {
        "hex": "0xC0000134",
        "id": "STATUS_SYNCHRONIZATION_REQUIRED",
        "desc": "On applicable Windows Server releases, the SAM database is significantly out of synchronization with the copy on the domain controller. A complete synchronization is required."
    },
    3221225782: {
        "hex": "0xC0000136",
        "id": "STATUS_OPEN_FAILED",
        "desc": "The NtCreateFile API failed. This error should never be returned to an application; it is a place holder for the Windows LAN Manager Redirector to use in its internal error-mapping routines."
    },
    3221225784: {
        "hex": "0xC0000138",
        "id": "STATUS_ORDINAL_NOT_FOUND",
        "desc": "{Ordinal Not Found} The ordinal %ld could not be located in the dynamic link library %hs."
    },
    3221225786: {
        "hex": "0xC000013A",
        "id": "STATUS_CONTROL_C_EXIT",
        "desc": "{Application Exit by CTRL+C} The application terminated as a result of a CTRL+C."
    },
    3221225788: {
        "hex": "0xC000013C",
        "id": "STATUS_REMOTE_DISCONNECT",
        "desc": "{Virtual Circuit Closed} The network transport on a remote computer has closed a network connection. There might or might not be I/O requests outstanding."
    },
    3221225790: {
        "hex": "0xC000013E",
        "id": "STATUS_LINK_FAILED",
        "desc": "{Virtual Circuit Closed} An existing connection (virtual circuit) has been broken at the remote computer. There is probably something wrong with the network software protocol or the network hardware on the remote computer."
    },
    3221225792: {
        "hex": "0xC0000140",
        "id": "STATUS_INVALID_CONNECTION",
        "desc": "The connection handle that was given to the transport was invalid."
    },
    3221225794: {
        "hex": "0xC0000142",
        "id": "STATUS_DLL_INIT_FAILED",
        "desc": "{DLL Initialization Failed} Initialization of the dynamic link library %hs failed. The process is terminating abnormally."
    },
    3221225796: {
        "hex": "0xC0000144",
        "id": "STATUS_UNHANDLED_EXCEPTION",
        "desc": "{Application Error} The exception %s (0x%08lx) occurred in the application at location 0x%08lx."
    },
    3221225798: {
        "hex": "0xC0000146",
        "id": "STATUS_PAGEFILE_CREATE_FAILED",
        "desc": "{Unable to Create Paging File} The creation of the paging file %hs failed (%lx). The requested size was %ld."
    },
    3221225800: {
        "hex": "0xC0000148",
        "id": "STATUS_INVALID_LEVEL",
        "desc": "{Incorrect System Call Level} An invalid level was passed into the specified system call."
    },
    3221225802: {
        "hex": "0xC000014A",
        "id": "STATUS_ILLEGAL_FLOAT_CONTEXT",
        "desc": "{EXCEPTION} A real-mode application issued a floating-point instruction and floating-point hardware is not present."
    },
    3221225804: {
        "hex": "0xC000014C",
        "id": "STATUS_REGISTRY_CORRUPT",
        "desc": "{The Registry Is Corrupt} The structure of one of the files that contains registry data is corrupt; the image of the file in memory is corrupt; or the file could not be recovered because the alternate copy or log was absent or corrupt."
    },
    3221225806: {
        "hex": "0xC000014E",
        "id": "STATUS_NO_EVENT_PAIR",
        "desc": "An event pair synchronization operation was performed using the thread-specific client/server event pair object, but no event pair object was associated with the thread."
    },
    3221225808: {
        "hex": "0xC0000150",
        "id": "STATUS_SERIAL_NO_DEVICE_INITED",
        "desc": "No serial device was successfully initialized. The serial driver will unload."
    },
    3221225810: {
        "hex": "0xC0000152",
        "id": "STATUS_MEMBER_NOT_IN_ALIAS",
        "desc": "The specified account name is not a member of the group."
    },
    3221225812: {
        "hex": "0xC0000154",
        "id": "STATUS_ALIAS_EXISTS",
        "desc": "The specified local group already exists."
    },
    3221225814: {
        "hex": "0xC0000156",
        "id": "STATUS_TOO_MANY_SECRETS",
        "desc": "The maximum number of secrets that can be stored in a single system was exceeded. The length and number of secrets is limited to satisfy U.S. State Department export restrictions."
    },
    3221225816: {
        "hex": "0xC0000158",
        "id": "STATUS_INTERNAL_DB_ERROR",
        "desc": "The local security authority (LSA) database contains an internal inconsistency."
    },
    3221225818: {
        "hex": "0xC000015A",
        "id": "STATUS_TOO_MANY_CONTEXT_IDS",
        "desc": "During a logon attempt, the user's security context accumulated too many security IDs. This is a very unusual situation. Remove the user from some global or local groups to reduce the number of security IDs to incorporate into the security context."
    },
    3221225820: {
        "hex": "0xC000015C",
        "id": "STATUS_NOT_REGISTRY_FILE",
        "desc": "The system has attempted to load or restore a file into the registry, and the specified file is not in the format of a registry file."
    },
    3221225822: {
        "hex": "0xC000015E",
        "id": "STATUS_DOMAIN_CTRLR_CONFIG_ERROR",
        "desc": "A domain server has an incorrect configuration."
    },
    3221225824: {
        "hex": "0xC0000160",
        "id": "STATUS_ILL_FORMED_SERVICE_ENTRY",
        "desc": "A configuration registry node that represents a driver service entry was ill-formed and did not contain the required value entries."
    },
    3221225826: {
        "hex": "0xC0000162",
        "id": "STATUS_UNMAPPABLE_CHARACTER",
        "desc": "No mapping for the Unicode character exists in the target multibyte code page."
    },
    3221225828: {
        "hex": "0xC0000164",
        "id": "STATUS_FLOPPY_VOLUME",
        "desc": "The paging file cannot be created on a floppy disk."
    },
    3221225830: {
        "hex": "0xC0000166",
        "id": "STATUS_FLOPPY_WRONG_CYLINDER",
        "desc": "{Floppy Disk Error} While accessing a floppy disk, the track address from the sector ID field was found to be different from the track address that is maintained by the controller."
    },
    3221225832: {
        "hex": "0xC0000168",
        "id": "STATUS_FLOPPY_BAD_REGISTERS",
        "desc": "{Floppy Disk Error} While accessing a floppy-disk, the controller returned inconsistent results via its registers."
    },
    3221225834: {
        "hex": "0xC000016A",
        "id": "STATUS_DISK_OPERATION_FAILED",
        "desc": "{Hard Disk Error} While accessing the hard disk, a disk operation failed even after retries."
    },
    3221225836: {
        "hex": "0xC000016C",
        "id": "STATUS_SHARED_IRQ_BUSY",
        "desc": "An attempt was made to open a device that was sharing an interrupt request (IRQ) with other devices. At least one other device that uses that IRQ was already opened. Two concurrent opens of devices that share an IRQ and only work via interrupts is not supported for the particular bus type that the devices use."
    },
    3221225838: {
        "hex": "0xC000016E",
        "id": "STATUS_BIOS_FAILED_TO_CONNECT_INTERRUPT",
        "desc": "The basic input/output system (BIOS) failed to connect a system interrupt to the device or bus for which the device is connected."
    },
    3221225843: {
        "hex": "0xC0000173",
        "id": "STATUS_INVALID_BLOCK_LENGTH",
        "desc": "When accessing a new tape of a multi-volume partition, the current blocksize is incorrect."
    },
    3221225845: {
        "hex": "0xC0000175",
        "id": "STATUS_UNABLE_TO_LOCK_MEDIA",
        "desc": "An attempt to lock the eject media mechanism failed."
    },
    3221225847: {
        "hex": "0xC0000177",
        "id": "STATUS_EOM_OVERFLOW",
        "desc": "The physical end of tape was detected."
    },
    3221225850: {
        "hex": "0xC000017A",
        "id": "STATUS_NO_SUCH_MEMBER",
        "desc": "A member could not be added to or removed from the local group because the member does not exist."
    },
    3221225852: {
        "hex": "0xC000017C",
        "id": "STATUS_KEY_DELETED",
        "desc": "An illegal operation was attempted on a registry key that has been marked for deletion."
    },
    3221225854: {
        "hex": "0xC000017E",
        "id": "STATUS_TOO_MANY_SIDS",
        "desc": "Too many SIDs have been specified."
    },
    3221225856: {
        "hex": "0xC0000180",
        "id": "STATUS_KEY_HAS_CHILDREN",
        "desc": "An attempt was made to create a symbolic link in a registry key that already has subkeys or values."
    },
    3221225858: {
        "hex": "0xC0000182",
        "id": "STATUS_DEVICE_CONFIGURATION_ERROR",
        "desc": "The I/O device is configured incorrectly or the configuration parameters to the driver are incorrect."
    },
    3221225860: {
        "hex": "0xC0000184",
        "id": "STATUS_INVALID_DEVICE_STATE",
        "desc": "The device is not in a valid state to perform this request."
    },
    3221225862: {
        "hex": "0xC0000186",
        "id": "STATUS_DEVICE_PROTOCOL_ERROR",
        "desc": "A protocol error was detected between the driver and the device."
    },
    3221225864: {
        "hex": "0xC0000188",
        "id": "STATUS_LOG_FILE_FULL",
        "desc": "The log file space is insufficient to support this operation."
    },
    3221225866: {
        "hex": "0xC000018A",
        "id": "STATUS_NO_TRUST_LSA_SECRET",
        "desc": "The workstation does not have a trust secret for the primary domain in the local LSA database."
    },
    3221225868: {
        "hex": "0xC000018C",
        "id": "STATUS_TRUSTED_DOMAIN_FAILURE",
        "desc": "The logon request failed because the trust relationship between the primary domain and the trusted domain failed."
    },
    3221225870: {
        "hex": "0xC000018E",
        "id": "STATUS_EVENTLOG_FILE_CORRUPT",
        "desc": "The Eventlog log file is corrupt."
    },
    3221225872: {
        "hex": "0xC0000190",
        "id": "STATUS_TRUST_FAILURE",
        "desc": "The network logon failed. This might be because the validation authority cannot be reached."
    },
    3221225874: {
        "hex": "0xC0000192",
        "id": "STATUS_NETLOGON_NOT_STARTED",
        "desc": "An attempt was made to logon, but the NetLogon service was not started."
    },
    3221225876: {
        "hex": "0xC0000194",
        "id": "STATUS_POSSIBLE_DEADLOCK",
        "desc": "{EXCEPTION} Possible deadlock condition."
    },
    3221225878: {
        "hex": "0xC0000196",
        "id": "STATUS_REMOTE_SESSION_LIMIT",
        "desc": "An attempt was made to establish a session to a network server, but there are already too many sessions established to that server."
    },
    3221225880: {
        "hex": "0xC0000198",
        "id": "STATUS_NOLOGON_INTERDOMAIN_TRUST_ACCOUNT",
        "desc": "The account used is an interdomain trust account. Use your global user account or local user account to access this server."
    },
    3221225882: {
        "hex": "0xC000019A",
        "id": "STATUS_NOLOGON_SERVER_TRUST_ACCOUNT",
        "desc": "The account used is a server trust account. Use your global user account or local user account to access this server."
    },
    3221225884: {
        "hex": "0xC000019C",
        "id": "STATUS_FS_DRIVER_REQUIRED",
        "desc": "A volume has been accessed for which a file system driver is required that has not yet been loaded."
    },
    3221225886: {
        "hex": "0xC000019E",
        "id": "STATUS_INCOMPATIBLE_WITH_GLOBAL_SHORT_NAME_REGISTRY_SETTING",
        "desc": "Short name settings cannot be changed on this volume due to the global registry setting."
    },
    3221225888: {
        "hex": "0xC00001A0",
        "id": "STATUS_SECURITY_STREAM_IS_INCONSISTENT",
        "desc": "The security stream for the given volume is in an inconsistent state. Please run CHKDSK on the volume."
    },
    3221225890: {
        "hex": "0xC00001A2",
        "id": "STATUS_INVALID_ACE_CONDITION",
        "desc": "The specified access control entry (ACE) contains an invalid condition."
    },
    3221225892: {
        "hex": "0xC00001A4",
        "id": "STATUS_NOTIFICATION_GUID_ALREADY_DEFINED",
        "desc": "The specified file already has a notification GUID associated with it."
    },
    3221225986: {
        "hex": "0xC0000202",
        "id": "STATUS_NO_USER_SESSION_KEY",
        "desc": "There is no user session key for the specified logon session."
    },
    3221225988: {
        "hex": "0xC0000204",
        "id": "STATUS_RESOURCE_LANG_NOT_FOUND",
        "desc": "Indicates the specified resource language ID cannot be found in the image file."
    },
    3221225990: {
        "hex": "0xC0000206",
        "id": "STATUS_INVALID_BUFFER_SIZE",
        "desc": "The size of the buffer is invalid for the specified operation."
    },
    3221225992: {
        "hex": "0xC0000208",
        "id": "STATUS_INVALID_ADDRESS_WILDCARD",
        "desc": "The transport rejected the specified network address due to invalid use of a wildcard."
    },
    3221225994: {
        "hex": "0xC000020A",
        "id": "STATUS_ADDRESS_ALREADY_EXISTS",
        "desc": "The transport address could not be opened because it already exists."
    },
    3221225996: {
        "hex": "0xC000020C",
        "id": "STATUS_CONNECTION_DISCONNECTED",
        "desc": "The transport connection is now disconnected."
    },
    3221225998: {
        "hex": "0xC000020E",
        "id": "STATUS_TOO_MANY_NODES",
        "desc": "The transport cannot dynamically acquire any more nodes."
    },
    3221226000: {
        "hex": "0xC0000210",
        "id": "STATUS_TRANSACTION_TIMED_OUT",
        "desc": "The transport timed out a request that is waiting for a response."
    },
    3221226002: {
        "hex": "0xC0000212",
        "id": "STATUS_TRANSACTION_NO_MATCH",
        "desc": "The transport did not find a transaction that matches the specific token."
    },
    3221226004: {
        "hex": "0xC0000214",
        "id": "STATUS_TRANSACTION_INVALID_ID",
        "desc": "The transport does not recognize the specified transaction request ID."
    },
    3221226006: {
        "hex": "0xC0000216",
        "id": "STATUS_NOT_SERVER_SESSION",
        "desc": "The transport can only process the specified request on the server side of a session."
    },
    3221226008: {
        "hex": "0xC0000218",
        "id": "STATUS_CANNOT_LOAD_REGISTRY_FILE",
        "desc": "{Registry File Failure} The registry cannot load the hive (file): %hs or its log or alternate. It is corrupt, absent, or not writable."
    },
    3221226010: {
        "hex": "0xC000021A",
        "id": "STATUS_SYSTEM_PROCESS_TERMINATED",
        "desc": "{Fatal System Error} The %hs system process terminated unexpectedly with a status of 0x%08x (0x%08x 0x%08x). The system has been shut down."
    },
    3221226012: {
        "hex": "0xC000021C",
        "id": "STATUS_NO_BROWSER_SERVERS_FOUND",
        "desc": "{Unable to Retrieve Browser Server List} The list of servers for this workgroup is not currently available."
    },
    3221226014: {
        "hex": "0xC000021E",
        "id": "STATUS_DRIVER_CANCEL_TIMEOUT",
        "desc": "{Cancel Timeout} The driver %hs failed to complete a canceled I/O request in the allotted time."
    },
    3221226016: {
        "hex": "0xC0000220",
        "id": "STATUS_MAPPED_ALIGNMENT",
        "desc": "{Mapped View Alignment Incorrect} An attempt was made to map a view of a file, but either the specified base address or the offset into the file were not aligned on the proper allocation granularity."
    },
    3221226018: {
        "hex": "0xC0000222",
        "id": "STATUS_LOST_WRITEBEHIND_DATA",
        "desc": "{Delayed Write Failed} Windows was unable to save all the data for the file %hs. The data has been lost. This error might be caused by a failure of your computer hardware or network connection. Try to save this file elsewhere."
    },
    3221226020: {
        "hex": "0xC0000224",
        "id": "STATUS_PASSWORD_MUST_CHANGE",
        "desc": "The user password must be changed before logging on the first time."
    },
    3221226022: {
        "hex": "0xC0000226",
        "id": "STATUS_NOT_TINY_STREAM",
        "desc": "The stream is not a tiny stream."
    },
    3221226024: {
        "hex": "0xC0000228",
        "id": "STATUS_STACK_OVERFLOW_READ",
        "desc": "The request must be handled by the stack overflow code."
    },
    3221226026: {
        "hex": "0xC000022A",
        "id": "STATUS_DUPLICATE_OBJECTID",
        "desc": "The attempt to insert the ID in the index failed because the ID is already in the index."
    },
    3221226028: {
        "hex": "0xC000022C",
        "id": "STATUS_CONVERT_TO_LARGE",
        "desc": "Internal OFS status codes indicating how an allocation operation is handled. Either it is retried after the containing oNode is moved or the extent stream is converted to a large stream."
    },
    3221226030: {
        "hex": "0xC000022E",
        "id": "STATUS_FOUND_OUT_OF_SCOPE",
        "desc": "The attempt to find the object found an object on the volume that matches by ID; however, it is out of the scope of the handle that is used for the operation."
    },
    3221226032: {
        "hex": "0xC0000230",
        "id": "STATUS_PROPSET_NOT_FOUND",
        "desc": "The specified property set does not exist on the object."
    },
    3221226034: {
        "hex": "0xC0000232",
        "id": "STATUS_INVALID_VARIANT",
        "desc": "The supplied variant structure contains invalid data."
    },
    3221226036: {
        "hex": "0xC0000234",
        "id": "STATUS_ACCOUNT_LOCKED_OUT",
        "desc": "The user account has been automatically locked because too many invalid logon attempts or password change attempts have been requested."
    },
    3221226038: {
        "hex": "0xC0000236",
        "id": "STATUS_CONNECTION_REFUSED",
        "desc": "The transport-connection attempt was refused by the remote system."
    },
    3221226040: {
        "hex": "0xC0000238",
        "id": "STATUS_ADDRESS_ALREADY_ASSOCIATED",
        "desc": "The transport endpoint already has an address associated with it."
    },
    3221226042: {
        "hex": "0xC000023A",
        "id": "STATUS_CONNECTION_INVALID",
        "desc": "An operation was attempted on a nonexistent transport connection."
    },
    3221226044: {
        "hex": "0xC000023C",
        "id": "STATUS_NETWORK_UNREACHABLE",
        "desc": "The remote network is not reachable by the transport."
    },
    3221226046: {
        "hex": "0xC000023E",
        "id": "STATUS_PROTOCOL_UNREACHABLE",
        "desc": "The remote system does not support the transport protocol."
    },
    3221226048: {
        "hex": "0xC0000240",
        "id": "STATUS_REQUEST_ABORTED",
        "desc": "The request was aborted."
    },
    3221226050: {
        "hex": "0xC0000242",
        "id": "STATUS_BAD_COMPRESSION_BUFFER",
        "desc": "The specified buffer contains ill-formed data."
    },
    3221226052: {
        "hex": "0xC0000244",
        "id": "STATUS_AUDIT_FAILED",
        "desc": "{Audit Failed} An attempt to generate a security audit failed."
    },
    3221226054: {
        "hex": "0xC0000246",
        "id": "STATUS_CONNECTION_COUNT_LIMIT",
        "desc": "A connection to the server could not be made because the limit on the number of concurrent connections for this account has been reached."
    },
    3221226056: {
        "hex": "0xC0000248",
        "id": "STATUS_LOGIN_WKSTA_RESTRICTION",
        "desc": "The account is not authorized to log on from this station."
    },
    3221226064: {
        "hex": "0xC0000250",
        "id": "STATUS_INSUFFICIENT_LOGON_INFO",
        "desc": "There is insufficient account information to log you on."
    },
    3221226066: {
        "hex": "0xC0000252",
        "id": "STATUS_BAD_SERVICE_ENTRYPOINT",
        "desc": "{Invalid Service Callback Entrypoint} The %hs service is not written correctly. The stack pointer has been left in an inconsistent state. The callback entry point should be declared as WINAPI or STDCALL. Selecting OK will cause the service to continue operation. However, the service process might operate incorrectly."
    },
    3221226068: {
        "hex": "0xC0000254",
        "id": "STATUS_IP_ADDRESS_CONFLICT1",
        "desc": "There is an IP address conflict with another system on the network."
    },
    3221226070: {
        "hex": "0xC0000256",
        "id": "STATUS_REGISTRY_QUOTA_LIMIT",
        "desc": "{Low On Registry Space} The system has reached the maximum size that is allowed for the system part of the registry. Additional storage requests will be ignored."
    },
    3221226072: {
        "hex": "0xC0000258",
        "id": "STATUS_NO_CALLBACK_ACTIVE",
        "desc": "A callback return system service cannot be executed when no callback is active."
    },
    3221226074: {
        "hex": "0xC000025A",
        "id": "STATUS_PWD_TOO_SHORT",
        "desc": "The password provided is too short to meet the policy of your user account. Choose a longer password."
    },
    3221226076: {
        "hex": "0xC000025C",
        "id": "STATUS_PWD_HISTORY_CONFLICT",
        "desc": "You have attempted to change your password to one that you have used in the past. The policy of your user account does not allow this. Select a password that you have not previously used."
    },
    3221226079: {
        "hex": "0xC000025F",
        "id": "STATUS_UNSUPPORTED_COMPRESSION",
        "desc": "The specified compression format is unsupported."
    },
    3221226081: {
        "hex": "0xC0000261",
        "id": "STATUS_INVALID_PLUGPLAY_DEVICE_PATH",
        "desc": "The specified Plug and Play registry device path is invalid."
    },
    3221226083: {
        "hex": "0xC0000263",
        "id": "STATUS_DRIVER_ENTRYPOINT_NOT_FOUND",
        "desc": "{Driver Entry Point Not Found} The %hs device driver could not locate the entry point %hs in driver %hs."
    },
    3221226085: {
        "hex": "0xC0000265",
        "id": "STATUS_TOO_MANY_LINKS",
        "desc": "An attempt was made to create more links on a file than the file system supports."
    },
    3221226087: {
        "hex": "0xC0000267",
        "id": "STATUS_FILE_IS_OFFLINE",
        "desc": "The specified file has been relocated to offline storage."
    },
    3221226089: {
        "hex": "0xC0000269",
        "id": "STATUS_ILLEGAL_DLL_RELOCATION",
        "desc": "{Illegal System DLL Relocation} The system DLL %hs was relocated in memory. The application will not run properly. The relocation occurred because the DLL %hs occupied an address range that is reserved for Windows system DLLs. The vendor supplying the DLL should be contacted for a new DLL."
    },
    3221226091: {
        "hex": "0xC000026B",
        "id": "STATUS_DLL_INIT_FAILED_LOGOFF",
        "desc": "{DLL Initialization Failed} The application failed to initialize because the window station is shutting down."
    },
    3221226093: {
        "hex": "0xC000026D",
        "id": "STATUS_DFS_UNAVAILABLE",
        "desc": "DFS is unavailable on the contacted server."
    },
    3221226095: {
        "hex": "0xC000026F",
        "id": "STATUS_WX86_INTERNAL_ERROR",
        "desc": "An internal error occurred in the Win32 x86 emulation subsystem."
    },
    3221226097: {
        "hex": "0xC0000271",
        "id": "STATUS_VALIDATE_CONTINUE",
        "desc": "The validation process needs to continue on to the next step."
    },
    3221226099: {
        "hex": "0xC0000273",
        "id": "STATUS_NO_MORE_MATCHES",
        "desc": "There are no more matches for the current index enumeration."
    },
    3221226102: {
        "hex": "0xC0000276",
        "id": "STATUS_IO_REPARSE_TAG_INVALID",
        "desc": "The Windows I/O reparse tag passed for the NTFS reparse point is invalid."
    },
    3221226104: {
        "hex": "0xC0000278",
        "id": "STATUS_IO_REPARSE_DATA_INVALID",
        "desc": "The user data passed for the NTFS reparse point is invalid."
    },
    3221226112: {
        "hex": "0xC0000280",
        "id": "STATUS_REPARSE_POINT_NOT_RESOLVED",
        "desc": "The NTFS symbolic link could not be resolved even though the initial file name is valid."
    },
    3221226114: {
        "hex": "0xC0000282",
        "id": "STATUS_RANGE_LIST_CONFLICT",
        "desc": "The range could not be added to the range list because of a conflict."
    },
    3221226116: {
        "hex": "0xC0000284",
        "id": "STATUS_DESTINATION_ELEMENT_FULL",
        "desc": "The specified medium changer destination element already contains media."
    },
    3221226118: {
        "hex": "0xC0000286",
        "id": "STATUS_MAGAZINE_NOT_PRESENT",
        "desc": "The specified element is contained in a magazine that is no longer present."
    },
    3221226122: {
        "hex": "0xC000028A",
        "id": "STATUS_ENCRYPTION_FAILED",
        "desc": "The file encryption attempt failed."
    },
    3221226124: {
        "hex": "0xC000028C",
        "id": "STATUS_RANGE_NOT_FOUND",
        "desc": "The specified range could not be found in the range list."
    },
    3221226126: {
        "hex": "0xC000028E",
        "id": "STATUS_NO_EFS",
        "desc": "The required encryption driver is not loaded for this system."
    },
    3221226128: {
        "hex": "0xC0000290",
        "id": "STATUS_NO_USER_KEYS",
        "desc": "There are no EFS keys defined for the user."
    },
    3221226130: {
        "hex": "0xC0000292",
        "id": "STATUS_NOT_EXPORT_FORMAT",
        "desc": "The specified file is not in the defined EFS export format."
    },
    3221226133: {
        "hex": "0xC0000295",
        "id": "STATUS_WMI_GUID_NOT_FOUND",
        "desc": "The GUID passed was not recognized as valid by a WMI data provider."
    },
    3221226135: {
        "hex": "0xC0000297",
        "id": "STATUS_WMI_ITEMID_NOT_FOUND",
        "desc": "The data item ID passed was not recognized as valid by a WMI data provider."
    },
    3221226137: {
        "hex": "0xC0000299",
        "id": "STATUS_SHARED_POLICY",
        "desc": "The policy object is shared and can only be modified at the root."
    },
    3221226139: {
        "hex": "0xC000029B",
        "id": "STATUS_POLICY_ONLY_IN_DS",
        "desc": "The requested policy information only lives in the Ds."
    },
    3221226141: {
        "hex": "0xC000029D",
        "id": "STATUS_REMOTE_STORAGE_NOT_ACTIVE",
        "desc": "The remote storage service is not operational at this time."
    },
    3221226143: {
        "hex": "0xC000029F",
        "id": "STATUS_NO_TRACKING_SERVICE",
        "desc": "The tracking (workstation) service is not running."
    },
    3221226145: {
        "hex": "0xC00002A1",
        "id": "STATUS_DS_NO_ATTRIBUTE_OR_VALUE",
        "desc": "The specified directory service attribute or value does not exist."
    },
    3221226147: {
        "hex": "0xC00002A3",
        "id": "STATUS_DS_ATTRIBUTE_TYPE_UNDEFINED",
        "desc": "The attribute type specified to the directory service is not defined."
    },
    3221226149: {
        "hex": "0xC00002A5",
        "id": "STATUS_DS_BUSY",
        "desc": "The directory service is busy."
    },
    3221226151: {
        "hex": "0xC00002A7",
        "id": "STATUS_DS_NO_RIDS_ALLOCATED",
        "desc": "The directory service was unable to allocate a relative identifier."
    },
    3221226153: {
        "hex": "0xC00002A9",
        "id": "STATUS_DS_INCORRECT_ROLE_OWNER",
        "desc": "The requested operation could not be performed because the directory service is not the master for that type of operation."
    },
    3221226155: {
        "hex": "0xC00002AB",
        "id": "STATUS_DS_OBJ_CLASS_VIOLATION",
        "desc": "The requested operation did not satisfy one or more constraints that are associated with the class of the object."
    },
    3221226157: {
        "hex": "0xC00002AD",
        "id": "STATUS_DS_CANT_ON_RDN",
        "desc": "The directory service cannot perform the requested operation on the Relatively Defined Name (RDN) attribute of an object."
    },
    3221226159: {
        "hex": "0xC00002AF",
        "id": "STATUS_DS_CROSS_DOM_MOVE_FAILED",
        "desc": "An error occurred while performing a cross domain move operation."
    },
    3221226161: {
        "hex": "0xC00002B1",
        "id": "STATUS_DIRECTORY_SERVICE_REQUIRED",
        "desc": "The requested operation requires a directory service, and none was available."
    },
    3221226163: {
        "hex": "0xC00002B3",
        "id": "STATUS_CANT_ENABLE_DENY_ONLY",
        "desc": "A group marked \"use for deny only\" cannot be enabled."
    },
    3221226165: {
        "hex": "0xC00002B5",
        "id": "STATUS_FLOAT_MULTIPLE_TRAPS",
        "desc": "{EXCEPTION} Multiple floating-point traps."
    },
    3221226167: {
        "hex": "0xC00002B7",
        "id": "STATUS_JOURNAL_DELETE_IN_PROGRESS",
        "desc": "The volume change journal is being deleted."
    },
    3221226169: {
        "hex": "0xC00002B9",
        "id": "STATUS_NOINTERFACE",
        "desc": "The requested interface is not supported."
    },
    3221226178: {
        "hex": "0xC00002C2",
        "id": "STATUS_DRIVER_FAILED_SLEEP",
        "desc": "{System Standby Failed} The driver %hs does not support standby mode. Updating this driver allows the system to go to standby mode."
    },
    3221226180: {
        "hex": "0xC00002C4",
        "id": "STATUS_CORRUPT_SYSTEM_FILE",
        "desc": "The system file %1 has become corrupt and has been replaced."
    },
    3221226182: {
        "hex": "0xC00002C6",
        "id": "STATUS_WMI_READ_ONLY",
        "desc": "The WMI data item or data block is read-only."
    },
    3221226184: {
        "hex": "0xC00002C8",
        "id": "STATUS_COMMITMENT_MINIMUM",
        "desc": "{Virtual Memory Minimum Too Low} Your system is low on virtual memory. Windows is increasing the size of your virtual memory paging file. During this process, memory requests for some applications might be denied. For more information, see Help."
    },
    3221226186: {
        "hex": "0xC00002CA",
        "id": "STATUS_TRANSPORT_FULL",
        "desc": "The transport element of the medium changer contains media, which is causing the operation to fail."
    },
    3221226188: {
        "hex": "0xC00002CC",
        "id": "STATUS_ONLY_IF_CONNECTED",
        "desc": "This operation is supported only when you are connected to the server."
    },
    3221226190: {
        "hex": "0xC00002CE",
        "id": "STATUS_PNP_RESTART_ENUMERATION",
        "desc": "A device was removed so enumeration must be restarted."
    },
    3221226192: {
        "hex": "0xC00002D0",
        "id": "STATUS_DS_CANT_MOD_PRIMARYGROUPID",
        "desc": "Cannot change the primary group ID of a domain controller account."
    },
    3221226194: {
        "hex": "0xC00002D2",
        "id": "STATUS_PNP_REBOOT_REQUIRED",
        "desc": "The device will not start without a reboot."
    },
    3221226196: {
        "hex": "0xC00002D4",
        "id": "STATUS_DS_INVALID_GROUP_TYPE",
        "desc": "The specified group type is invalid."
    },
    3221226198: {
        "hex": "0xC00002D6",
        "id": "STATUS_DS_NO_NEST_LOCALGROUP_IN_MIXEDDOMAIN",
        "desc": "In a mixed domain, cannot nest local groups with other local groups, if the group is security enabled."
    },
    3221226200: {
        "hex": "0xC00002D8",
        "id": "STATUS_DS_GLOBAL_CANT_HAVE_UNIVERSAL_MEMBER",
        "desc": "A global group cannot have a universal group as a member."
    },
    3221226202: {
        "hex": "0xC00002DA",
        "id": "STATUS_DS_GLOBAL_CANT_HAVE_CROSSDOMAIN_MEMBER",
        "desc": "A global group cannot have a cross-domain member."
    },
    3221226204: {
        "hex": "0xC00002DC",
        "id": "STATUS_DS_HAVE_PRIMARY_MEMBERS",
        "desc": "Cannot change to a security-disabled group because primary members are in this group."
    },
    3221226206: {
        "hex": "0xC00002DE",
        "id": "STATUS_INSUFFICIENT_POWER",
        "desc": "There is not enough power to complete the requested operation."
    },
    3221226208: {
        "hex": "0xC00002E0",
        "id": "STATUS_SAM_NEED_BOOTKEY_FLOPPY",
        "desc": "The Security Accounts Manager needs to get the boot key from the floppy disk."
    },
    3221226210: {
        "hex": "0xC00002E2",
        "id": "STATUS_DS_INIT_FAILURE",
        "desc": "The directory service could not start because of the following error: %hs Error Status: 0x%x. Click OK to shut down this system and restart in Directory Services Restore Mode. Check the event log for more detailed information."
    },
    3221226212: {
        "hex": "0xC00002E4",
        "id": "STATUS_DS_GC_REQUIRED",
        "desc": "The requested operation can be performed only on a global catalog server."
    },
    3221226214: {
        "hex": "0xC00002E6",
        "id": "STATUS_DS_NO_FPO_IN_UNIVERSAL_GROUPS",
        "desc": "Foreign security principals cannot be members of universal groups."
    },
    3221226217: {
        "hex": "0xC00002E9",
        "id": "STATUS_CURRENT_DOMAIN_NOT_ALLOWED",
        "desc": "This operation cannot be performed on the current domain."
    },
    3221226219: {
        "hex": "0xC00002EB",
        "id": "STATUS_SYSTEM_SHUTDOWN",
        "desc": "The system is in the process of shutting down."
    },
    3221226221: {
        "hex": "0xC00002ED",
        "id": "STATUS_DS_SAM_INIT_FAILURE_CONSOLE",
        "desc": "Security Accounts Manager initialization failed because of the following error: %hs Error Status: 0x%x. Click OK to shut down the system. You can use the recovery console to diagnose the system further."
    },
    3221226223: {
        "hex": "0xC00002EF",
        "id": "STATUS_NO_TGT_REPLY",
        "desc": "The client is trying to negotiate a context and the server requires user-to-user but did not send a TGT reply."
    },
    3221226225: {
        "hex": "0xC00002F1",
        "id": "STATUS_NO_IP_ADDRESSES",
        "desc": "Unable to accomplish the requested task because the local machine does not have any IP addresses."
    },
    3221226227: {
        "hex": "0xC00002F3",
        "id": "STATUS_CRYPTO_SYSTEM_INVALID",
        "desc": "The crypto system or checksum function is invalid because a required function is unavailable."
    },
    3221226229: {
        "hex": "0xC00002F5",
        "id": "STATUS_MUST_BE_KDC",
        "desc": "The local machine must be a Kerberos KDC (domain controller) and it is not."
    },
    3221226231: {
        "hex": "0xC00002F7",
        "id": "STATUS_TOO_MANY_PRINCIPALS",
        "desc": "The KDC reply contained more than one principal name."
    },
    3221226233: {
        "hex": "0xC00002F9",
        "id": "STATUS_PKINIT_NAME_MISMATCH",
        "desc": "The client certificate does not contain a valid UPN, or does not match the client name in the logon request. Contact your administrator."
    },
    3221226235: {
        "hex": "0xC00002FB",
        "id": "STATUS_KDC_INVALID_REQUEST",
        "desc": "An invalid request was sent to the KDC."
    },
    3221226237: {
        "hex": "0xC00002FD",
        "id": "STATUS_KDC_UNKNOWN_ETYPE",
        "desc": "The encryption type requested is not supported by the KDC."
    },
    3221226239: {
        "hex": "0xC00002FF",
        "id": "STATUS_SERVER_SHUTDOWN_IN_PROGRESS",
        "desc": "The server machine is shutting down."
    },
    3221226241: {
        "hex": "0xC0000301",
        "id": "STATUS_WMI_GUID_DISCONNECTED",
        "desc": "The WMI GUID is no longer available."
    },
    3221226243: {
        "hex": "0xC0000303",
        "id": "STATUS_WMI_ALREADY_ENABLED",
        "desc": "Collection or events for the WMI GUID is already enabled."
    },
    3221226245: {
        "hex": "0xC0000305",
        "id": "STATUS_COPY_PROTECTION_FAILURE",
        "desc": "Copy protection failure."
    },
    3221226247: {
        "hex": "0xC0000307",
        "id": "STATUS_CSS_KEY_NOT_PRESENT",
        "desc": "Copy protection error—The specified sector does not contain a valid key."
    },
    3221226249: {
        "hex": "0xC0000309",
        "id": "STATUS_CSS_SCRAMBLED_SECTOR",
        "desc": "Copy protection error—The read failed because the sector is encrypted."
    },
    3221226251: {
        "hex": "0xC000030B",
        "id": "STATUS_CSS_RESETS_EXHAUSTED",
        "desc": "Copy protection error—The region setting of the drive might be permanent."
    },
    3221226273: {
        "hex": "0xC0000321",
        "id": "STATUS_SMARTCARD_SUBSYSTEM_FAILURE",
        "desc": "The Kerberos protocol encountered an error while attempting to use the smart card subsystem."
    },
    3221226320: {
        "hex": "0xC0000350",
        "id": "STATUS_HOST_DOWN",
        "desc": "The transport determined that the remote system is down."
    },
    3221226322: {
        "hex": "0xC0000352",
        "id": "STATUS_EFS_ALG_BLOB_TOO_BIG",
        "desc": "The encryption algorithm that is used on the source file needs a bigger key buffer than the one that is used on the destination file."
    },
    3221226324: {
        "hex": "0xC0000354",
        "id": "STATUS_DEBUGGER_INACTIVE",
        "desc": "An attempt to do an operation on a debug port failed because the port is in the process of being deleted."
    },
    3221226326: {
        "hex": "0xC0000356",
        "id": "STATUS_AUDITING_DISABLED",
        "desc": "The specified event is currently not being audited."
    },
    3221226328: {
        "hex": "0xC0000358",
        "id": "STATUS_DS_AG_CANT_HAVE_UNIVERSAL_MEMBER",
        "desc": "An account group cannot have a universal group as a member."
    },
    3221226330: {
        "hex": "0xC000035A",
        "id": "STATUS_INVALID_IMAGE_WIN_64",
        "desc": "The specified image file did not have the correct format; it appears to be a 64-bit Windows image."
    },
    3221226332: {
        "hex": "0xC000035C",
        "id": "STATUS_NETWORK_SESSION_EXPIRED",
        "desc": "The client session has expired; so the client must re-authenticate to continue accessing the remote resources."
    },
    3221226334: {
        "hex": "0xC000035E",
        "id": "STATUS_ALL_SIDS_FILTERED",
        "desc": "The SID filtering operation removed all SIDs."
    },
    3221226337: {
        "hex": "0xC0000361",
        "id": "STATUS_ACCESS_DISABLED_BY_POLICY_DEFAULT",
        "desc": "Access to %1 has been restricted by your Administrator by the default software restriction policy level."
    },
    3221226339: {
        "hex": "0xC0000363",
        "id": "STATUS_ACCESS_DISABLED_BY_POLICY_PUBLISHER",
        "desc": "Access to %1 has been restricted by your Administrator by software publisher policy."
    },
    3221226341: {
        "hex": "0xC0000365",
        "id": "STATUS_FAILED_DRIVER_ENTRY",
        "desc": "The driver was not loaded because it failed its initialization call."
    },
    3221226344: {
        "hex": "0xC0000368",
        "id": "STATUS_MOUNT_POINT_NOT_RESOLVED",
        "desc": "The create operation failed because the name contained at least one mount point that resolves to a volume to which the specified device object is not attached."
    },
    3221226346: {
        "hex": "0xC000036A",
        "id": "STATUS_MCA_OCCURED",
        "desc": "A machine check error has occurred. Check the system event log for additional information."
    },
    3221226348: {
        "hex": "0xC000036C",
        "id": "STATUS_DRIVER_BLOCKED",
        "desc": "Driver %2 has been blocked from loading."
    },
    3221226350: {
        "hex": "0xC000036E",
        "id": "STATUS_SYSTEM_HIVE_TOO_LARGE",
        "desc": "System hive size has exceeded its limit."
    },
    3221226353: {
        "hex": "0xC0000371",
        "id": "STATUS_NO_SECRETS",
        "desc": "The local account store does not contain secret material for the specified account."
    },
    3221226355: {
        "hex": "0xC0000373",
        "id": "STATUS_FAILED_STACK_SWITCH",
        "desc": "The system was not able to allocate enough memory to perform a stack switch."
    },
    3221226368: {
        "hex": "0xC0000380",
        "id": "STATUS_SMARTCARD_WRONG_PIN",
        "desc": "An incorrect PIN was presented to the smart card."
    },
    3221226370: {
        "hex": "0xC0000382",
        "id": "STATUS_SMARTCARD_CARD_NOT_AUTHENTICATED",
        "desc": "No PIN was presented to the smart card."
    },
    3221226372: {
        "hex": "0xC0000384",
        "id": "STATUS_SMARTCARD_NO_KEY_CONTAINER",
        "desc": "The requested key container does not exist on the smart card."
    },
    3221226374: {
        "hex": "0xC0000386",
        "id": "STATUS_SMARTCARD_NO_KEYSET",
        "desc": "The requested keyset does not exist."
    },
    3221226376: {
        "hex": "0xC0000388",
        "id": "STATUS_DOWNGRADE_DETECTED",
        "desc": "The system detected a possible attempt to compromise security. Ensure that you can contact the server that authenticated you."
    },
    3221226378: {
        "hex": "0xC000038A",
        "id": "STATUS_ISSUING_CA_UNTRUSTED",
        "desc": "An untrusted certificate authority was detected while processing the smart card certificate that is used for authentication. Contact your system administrator."
    },
    3221226380: {
        "hex": "0xC000038C",
        "id": "STATUS_PKINIT_CLIENT_FAILURE",
        "desc": "The smart card certificate used for authentication was not trusted. Contact your system administrator."
    },
    3221226382: {
        "hex": "0xC000038E",
        "id": "STATUS_DRIVER_FAILED_PRIOR_UNLOAD",
        "desc": "The driver could not be loaded because a previous version of the driver is still in memory."
    },
    3221226497: {
        "hex": "0xC0000401",
        "id": "STATUS_PER_USER_TRUST_QUOTA_EXCEEDED",
        "desc": "The delegated trust creation quota of the current user has been exceeded."
    },
    3221226499: {
        "hex": "0xC0000403",
        "id": "STATUS_USER_DELETE_TRUST_QUOTA_EXCEEDED",
        "desc": "The delegated trust deletion quota of the current user has been exceeded."
    },
    3221226501: {
        "hex": "0xC0000405",
        "id": "STATUS_DS_DUPLICATE_ID_FOUND",
        "desc": "The requested object has a non-unique identifier and cannot be retrieved."
    },
    3221226503: {
        "hex": "0xC0000407",
        "id": "STATUS_VOLSNAP_PREPARE_HIBERNATE",
        "desc": "{Volume Shadow Copy Service} Wait while the Volume Shadow Copy Service prepares volume %hs for hibernation."
    },
    3221226505: {
        "hex": "0xC0000409",
        "id": "STATUS_STACK_BUFFER_OVERRUN",
        "desc": "The system detected an overrun of a stack-based buffer in this application. This overrun could potentially allow a malicious user to gain control of this application."
    },
    3221226507: {
        "hex": "0xC000040B",
        "id": "STATUS_CROSSREALM_DELEGATION_FAILURE",
        "desc": "An attempt was made by this server to make a Kerberos constrained delegation request for a target that is outside the server realm. This action is not supported and the resulting error indicates a misconfiguration on the allowed-to-delegate-to list for this server. Contact your administrator."
    },
    3221226509: {
        "hex": "0xC000040D",
        "id": "STATUS_ISSUING_CA_UNTRUSTED_KDC",
        "desc": "An untrusted certificate authority was detected while processing the domain controller certificate used for authentication. There is additional information in the system event log. Contact your system administrator."
    },
    3221226511: {
        "hex": "0xC000040F",
        "id": "STATUS_KDC_CERT_REVOKED",
        "desc": "The domain controller certificate used for smart card logon has been revoked. Contact your system administrator with the contents of your system event log."
    },
    3221226513: {
        "hex": "0xC0000411",
        "id": "STATUS_HIBERNATION_FAILURE",
        "desc": "The system has failed to hibernate (The error code is %hs). Hibernation will be disabled until the system is restarted."
    },
    3221226515: {
        "hex": "0xC0000413",
        "id": "STATUS_AUTHENTICATION_FIREWALL_FAILED",
        "desc": "Logon Failure: The machine you are logging onto is protected by an authentication firewall. The specified account is not allowed to authenticate to the machine."
    },
    3221226517: {
        "hex": "0xC0000415",
        "id": "STATUS_HUNG_DISPLAY_DRIVER_THREAD",
        "desc": "{Display Driver Stopped Responding} The %hs display driver has stopped working normally. Save your work and reboot the system to restore full display functionality. The next time you reboot the machine a dialog will be displayed giving you a chance to report this failure to Microsoft."
    },
    3221226519: {
        "hex": "0xC0000417",
        "id": "STATUS_INVALID_CRUNTIME_PARAMETER",
        "desc": "An invalid parameter was passed to a C runtime function."
    },
    3221226521: {
        "hex": "0xC0000419",
        "id": "STATUS_DS_SRC_SID_EXISTS_IN_FOREST",
        "desc": "The source object's SID already exists in destination forest."
    },
    3221226523: {
        "hex": "0xC000041B",
        "id": "STATUS_DS_FLAT_NAME_EXISTS_IN_FOREST",
        "desc": "The flat name of the trusted domain already exists in the forest."
    },
    3221226528: {
        "hex": "0xC0000420",
        "id": "STATUS_ASSERTION_FAILURE",
        "desc": "There has been an assertion failure."
    },
    3221226531: {
        "hex": "0xC0000423",
        "id": "STATUS_CALLBACK_POP_STACK",
        "desc": "A user mode unwind is in progress."
    },
    3221226533: {
        "hex": "0xC0000425",
        "id": "STATUS_HIVE_UNLOADED",
        "desc": "Illegal operation attempted on a registry key which has already been unloaded."
    },
    3221226535: {
        "hex": "0xC0000427",
        "id": "STATUS_FILE_SYSTEM_LIMITATION",
        "desc": "The requested operation could not be completed due to a file system limitation."
    },
    3221226537: {
        "hex": "0xC0000429",
        "id": "STATUS_NOT_CAPABLE",
        "desc": "The implementation is not capable of performing the request."
    },
    3221226539: {
        "hex": "0xC000042B",
        "id": "STATUS_IMPLEMENTATION_LIMIT",
        "desc": "An operation attempted to exceed an implementation-defined limit."
    },
    3221226541: {
        "hex": "0xC000042D",
        "id": "STATUS_NO_SECURITY_CONTEXT",
        "desc": "The required security context does not exist."
    },
    3221226546: {
        "hex": "0xC0000432",
        "id": "STATUS_BEYOND_VDL",
        "desc": "The operation was attempted beyond the valid data length of the file."
    },
    3221226548: {
        "hex": "0xC0000434",
        "id": "STATUS_PTE_CHANGED",
        "desc": "The page fault mappings changed in the middle of processing a fault so the operation must be retried."
    },
    3221226560: {
        "hex": "0xC0000440",
        "id": "STATUS_CRED_REQUIRES_CONFIRMATION",
        "desc": "The requested credential requires confirmation."
    },
    3221226562: {
        "hex": "0xC0000442",
        "id": "STATUS_CS_ENCRYPTION_UNSUPPORTED_SERVER",
        "desc": "Client Side Encryption is not supported by the remote server even though it claims to support it."
    },
    3221226564: {
        "hex": "0xC0000444",
        "id": "STATUS_CS_ENCRYPTION_NEW_ENCRYPTED_FILE",
        "desc": "A new encrypted file is being created and a $EFS needs to be provided."
    },
    3221226566: {
        "hex": "0xC0000446",
        "id": "STATUS_INVALID_LABEL",
        "desc": "Indicates a particular Security ID cannot be assigned as the label of an object."
    },
    3221226577: {
        "hex": "0xC0000451",
        "id": "STATUS_AMBIGUOUS_SYSTEM_DEVICE",
        "desc": "The requested system device cannot be identified due to multiple indistinguishable devices potentially matching the identification criteria."
    },
    3221226579: {
        "hex": "0xC0000453",
        "id": "STATUS_RESTART_BOOT_APPLICATION",
        "desc": "This boot application must be restarted."
    },
    3221226592: {
        "hex": "0xC0000460",
        "id": "STATUS_NO_RANGES_PROCESSED",
        "desc": "No ranges for the specified operation were able to be processed."
    },
    3221226596: {
        "hex": "0xC0000464",
        "id": "STATUS_DEVICE_UNREACHABLE",
        "desc": "Data cannot be moved because the source device cannot communicate with the destination device."
    },
    3221226598: {
        "hex": "0xC0000466",
        "id": "STATUS_SERVER_UNAVAILABLE",
        "desc": "The file server is temporarily unavailable."
    },
    3221226599: {
        "hex": "0xC0000467",
        "id": "STATUS_FILE_NOT_AVAILABLE",
        "desc": "The file is temporarily unavailable."
    },
    3221226753: {
        "hex": "0xC0000501",
        "id": "STATUS_INVALID_TASK_INDEX",
        "desc": "The specified task index is invalid."
    },
    3221226755: {
        "hex": "0xC0000503",
        "id": "STATUS_CALLBACK_BYPASS",
        "desc": "A callback has requested to bypass native code."
    },
    3221227011: {
        "hex": "0xC0000603",
        "id": "STATUS_IMAGE_CERT_REVOKED",
        "desc": "Windows cannot verify the digital signature for this file. The signing certificate for this file has been revoked."
    },
    3221227265: {
        "hex": "0xC0000701",
        "id": "STATUS_MESSAGE_LOST",
        "desc": "The ALPC message requested is no longer available."
    },
    3221227267: {
        "hex": "0xC0000703",
        "id": "STATUS_REQUEST_CANCELED",
        "desc": "The ALPC message has been canceled."
    },
    3221227269: {
        "hex": "0xC0000705",
        "id": "STATUS_LPC_RECEIVE_BUFFER_EXPECTED",
        "desc": "No receive buffer has been supplied in a synchronous request."
    },
    3221227271: {
        "hex": "0xC0000707",
        "id": "STATUS_LPC_REQUESTS_NOT_ALLOWED",
        "desc": "The ALPC port does not accept new request messages."
    },
    3221227273: {
        "hex": "0xC0000709",
        "id": "STATUS_HARDWARE_MEMORY_ERROR",
        "desc": "The hardware has reported an uncorrectable memory error."
    },
    3221227275: {
        "hex": "0xC000070B",
        "id": "STATUS_THREADPOOL_SET_EVENT_ON_COMPLETION_FAILED",
        "desc": "After a callback to 0x%p(0x%p), a completion call to Set event(0x%p) failed with status 0x%08x."
    },
    3221227277: {
        "hex": "0xC000070D",
        "id": "STATUS_THREADPOOL_RELEASE_MUTEX_ON_COMPLETION_FAILED",
        "desc": "After a callback to 0x%p(0x%p), a completion call to ReleaseMutex(%p) failed with status 0x%08x."
    },
    3221227279: {
        "hex": "0xC000070F",
        "id": "STATUS_THREADPOOL_RELEASED_DURING_OPERATION",
        "desc": "The thread pool 0x%p was released while a thread was posting a callback to 0x%p(0x%p) to it."
    },
    3221227281: {
        "hex": "0xC0000711",
        "id": "STATUS_APC_RETURNED_WHILE_IMPERSONATING",
        "desc": "A thread pool worker thread is impersonating a client, after executing an APC. This is unexpected, indicating that the APC is missing a call to revert the impersonation."
    },
    3221227283: {
        "hex": "0xC0000713",
        "id": "STATUS_MCA_EXCEPTION",
        "desc": "A thread is getting dispatched with MCA EXCEPTION because of MCA."
    },
    3221227285: {
        "hex": "0xC0000715",
        "id": "STATUS_SYMLINK_CLASS_DISABLED",
        "desc": "The symbolic link cannot be followed because its type is disabled."
    },
    3221227287: {
        "hex": "0xC0000717",
        "id": "STATUS_NO_UNICODE_TRANSLATION",
        "desc": "No mapping for the Unicode character exists in the target multi-byte code page."
    },
    3221227289: {
        "hex": "0xC0000719",
        "id": "STATUS_CONTEXT_MISMATCH",
        "desc": "The provided context did not match the target."
    },
    3221227291: {
        "hex": "0xC000071B",
        "id": "STATUS_CALLBACK_RETURNED_THREAD_PRIORITY",
        "desc": "A threadpool worker thread entered a callback at thread base priority 0x%x and exited at priority 0x%x."
    },
    3221227292: {
        "hex": "0xC000071C",
        "id": "STATUS_INVALID_THREAD",
        "desc": "An invalid thread, handle %p, is specified for this operation. Possibly, a threadpool worker thread was specified."
    },
    3221227294: {
        "hex": "0xC000071E",
        "id": "STATUS_CALLBACK_RETURNED_LDR_LOCK",
        "desc": "A threadpool worker thread entered a callback, which left the loader lock held."
    },
    3221227295: {
        "hex": "0xC000071F",
        "id": "STATUS_CALLBACK_RETURNED_LANG",
        "desc": "A threadpool worker thread entered a callback, which left with preferred languages set."
    },
    3221227296: {
        "hex": "0xC0000720",
        "id": "STATUS_CALLBACK_RETURNED_PRI_BACK",
        "desc": "A threadpool worker thread entered a callback, which left with background priorities set."
    },
    3221227297: {
        "hex": "0xC0000721",
        "id": "STATUS_CALLBACK_RETURNED_THREAD_AFFINITY",
        "desc": "A threadpool worker thread entered a callback at thread affinity %p and exited at affinity %p."
    },
    3221227520: {
        "hex": "0xC0000800",
        "id": "STATUS_DISK_REPAIR_DISABLED",
        "desc": "The attempted operation required self healing to be enabled."
    },
    3221227522: {
        "hex": "0xC0000802",
        "id": "STATUS_DISK_QUOTA_EXCEEDED",
        "desc": "An operation failed because the storage quota was exceeded."
    },
    3221227525: {
        "hex": "0xC0000805",
        "id": "STATUS_BAD_CLUSTERS",
        "desc": "The operation could not be completed due to bad clusters on disk."
    },
    3221227777: {
        "hex": "0xC0000901",
        "id": "STATUS_FILE_CHECKED_OUT",
        "desc": "This file is checked out or locked for editing by another user."
    },
    3221227779: {
        "hex": "0xC0000903",
        "id": "STATUS_BAD_FILE_TYPE",
        "desc": "The file type being saved or retrieved has been blocked."
    },
    3221227781: {
        "hex": "0xC0000905",
        "id": "STATUS_FORMS_AUTH_REQUIRED",
        "desc": "Access Denied. Before opening files in this location, you must first browse to the e.g. site and select the option to log on automatically."
    },
    3221227783: {
        "hex": "0xC0000907",
        "id": "STATUS_VIRUS_DELETED",
        "desc": "This file contains a virus and cannot be opened. Due to the nature of this virus, the file has been removed from this location."
    },
    3221227785: {
        "hex": "0xC0000909",
        "id": "STATUS_CANNOT_BREAK_OPLOCK",
        "desc": "The operation did not complete successfully because it would cause an oplock to be broken. The caller has requested that existing oplocks not be broken."
    },
    3221266432: {
        "hex": "0xC000A000",
        "id": "STATUS_INVALID_SIGNATURE",
        "desc": "The cryptographic signature is invalid."
    },
    3221266448: {
        "hex": "0xC000A010",
        "id": "STATUS_IPSEC_QUEUE_OVERFLOW",
        "desc": "The IPsec queue overflowed."
    },
    3221266450: {
        "hex": "0xC000A012",
        "id": "STATUS_HOPLIMIT_EXCEEDED",
        "desc": "An Internet Control Message Protocol (ICMP) hop limit exceeded error was received."
    },
    3221266560: {
        "hex": "0xC000A080",
        "id": "STATUS_LOST_WRITEBEHIND_DATA_NETWORK_DISCONNECTED",
        "desc": "{Delayed Write Failed} Windows was unable to save all the data for the file %hs; the data has been lost. This error might be caused by network connectivity issues. Try to save this file elsewhere."
    },
    3221266562: {
        "hex": "0xC000A082",
        "id": "STATUS_LOST_WRITEBEHIND_DATA_LOCAL_DISK_ERROR",
        "desc": "{Delayed Write Failed} Windows was unable to save all the data for the file %hs; the data has been lost. This error might be caused if the device has been removed or the media is write-protected."
    },
    3221266564: {
        "hex": "0xC000A084",
        "id": "STATUS_XMLDSIG_ERROR",
        "desc": "An error was encountered while processing an XML digital signature."
    },
    3221266566: {
        "hex": "0xC000A086",
        "id": "STATUS_AUTHIP_FAILURE",
        "desc": "This indicates that there was an AuthIP failure when attempting to connect to the remote host."
    },
    3221266568: {
        "hex": "0xC000A088",
        "id": "STATUS_DS_OID_NOT_FOUND",
        "desc": "The specified OID cannot be found."
    },
    3221266689: {
        "hex": "0xC000A101",
        "id": "STATUS_HASH_NOT_PRESENT",
        "desc": "The hash requests is not present or not up to date with the current file contents."
    },
    3221267106: {
        "hex": "0xC000A2A2",
        "id": "STATUS_OFFLOAD_WRITE_FLT_NOT_SUPPORTED",
        "desc": "A file system filter on the server has not opted in for Offload Write support."
    },
    3221267108: {
        "hex": "0xC000A2A4",
        "id": "STATUS_OFFLOAD_WRITE_FILE_NOT_SUPPORTED",
        "desc": "Offload write operations cannot be performed on:"
    },
    3221291009: {
        "hex": "0xC0010001",
        "id": "DBG_NO_STATE_CHANGE",
        "desc": "The debugger did not perform a state change."
    },
    3221356545: {
        "hex": "0xC0020001",
        "id": "RPC_NT_INVALID_STRING_BINDING",
        "desc": "The string binding is invalid."
    },
    3221356547: {
        "hex": "0xC0020003",
        "id": "RPC_NT_INVALID_BINDING",
        "desc": "The binding handle is invalid."
    },
    3221356549: {
        "hex": "0xC0020005",
        "id": "RPC_NT_INVALID_RPC_PROTSEQ",
        "desc": "The RPC protocol sequence is invalid."
    },
    3221356551: {
        "hex": "0xC0020007",
        "id": "RPC_NT_INVALID_ENDPOINT_FORMAT",
        "desc": "The endpoint format is invalid."
    },
    3221356553: {
        "hex": "0xC0020009",
        "id": "RPC_NT_NO_ENDPOINT_FOUND",
        "desc": "No endpoint was found."
    },
    3221356555: {
        "hex": "0xC002000B",
        "id": "RPC_NT_OBJECT_NOT_FOUND",
        "desc": "The object UUID was not found."
    },
    3221356557: {
        "hex": "0xC002000D",
        "id": "RPC_NT_TYPE_ALREADY_REGISTERED",
        "desc": "The type UUID has already been registered."
    },
    3221356559: {
        "hex": "0xC002000F",
        "id": "RPC_NT_NO_PROTSEQS_REGISTERED",
        "desc": "No protocol sequences have been registered."
    },
    3221356561: {
        "hex": "0xC0020011",
        "id": "RPC_NT_UNKNOWN_MGR_TYPE",
        "desc": "The manager type is unknown."
    },
    3221356563: {
        "hex": "0xC0020013",
        "id": "RPC_NT_NO_BINDINGS",
        "desc": "There are no bindings."
    },
    3221356565: {
        "hex": "0xC0020015",
        "id": "RPC_NT_CANT_CREATE_ENDPOINT",
        "desc": "The endpoint cannot be created."
    },
    3221356567: {
        "hex": "0xC0020017",
        "id": "RPC_NT_SERVER_UNAVAILABLE",
        "desc": "The RPC server is unavailable."
    },
    3221356569: {
        "hex": "0xC0020019",
        "id": "RPC_NT_INVALID_NETWORK_OPTIONS",
        "desc": "The network options are invalid."
    },
    3221356571: {
        "hex": "0xC002001B",
        "id": "RPC_NT_CALL_FAILED",
        "desc": "The RPC failed."
    },
    3221356573: {
        "hex": "0xC002001D",
        "id": "RPC_NT_PROTOCOL_ERROR",
        "desc": "An RPC protocol error occurred."
    },
    3221356577: {
        "hex": "0xC0020021",
        "id": "RPC_NT_UNSUPPORTED_TYPE",
        "desc": "The type UUID is not supported."
    },
    3221356579: {
        "hex": "0xC0020023",
        "id": "RPC_NT_INVALID_BOUND",
        "desc": "The array bounds are invalid."
    },
    3221356581: {
        "hex": "0xC0020025",
        "id": "RPC_NT_INVALID_NAME_SYNTAX",
        "desc": "The name syntax is invalid."
    },
    3221356584: {
        "hex": "0xC0020028",
        "id": "RPC_NT_UUID_NO_ADDRESS",
        "desc": "No network address is available to construct a UUID."
    },
    3221356586: {
        "hex": "0xC002002A",
        "id": "RPC_NT_UNKNOWN_AUTHN_TYPE",
        "desc": "The authentication type is unknown."
    },
    3221356588: {
        "hex": "0xC002002C",
        "id": "RPC_NT_STRING_TOO_LONG",
        "desc": "The string is too long."
    },
    3221356590: {
        "hex": "0xC002002E",
        "id": "RPC_NT_PROCNUM_OUT_OF_RANGE",
        "desc": "The procedure number is out of range."
    },
    3221356592: {
        "hex": "0xC0020030",
        "id": "RPC_NT_UNKNOWN_AUTHN_SERVICE",
        "desc": "The authentication service is unknown."
    },
    3221356594: {
        "hex": "0xC0020032",
        "id": "RPC_NT_INVALID_AUTH_IDENTITY",
        "desc": "The security context is invalid."
    },
    3221356596: {
        "hex": "0xC0020034",
        "id": "EPT_NT_INVALID_ENTRY",
        "desc": "The entry is invalid."
    },
    3221356598: {
        "hex": "0xC0020036",
        "id": "EPT_NT_NOT_REGISTERED",
        "desc": "No more endpoints are available from the endpoint mapper."
    },
    3221356600: {
        "hex": "0xC0020038",
        "id": "RPC_NT_INCOMPLETE_NAME",
        "desc": "The entry name is incomplete."
    },
    3221356602: {
        "hex": "0xC002003A",
        "id": "RPC_NT_NO_MORE_MEMBERS",
        "desc": "There are no more members."
    },
    3221356604: {
        "hex": "0xC002003C",
        "id": "RPC_NT_INTERFACE_NOT_FOUND",
        "desc": "The interface was not found."
    },
    3221356606: {
        "hex": "0xC002003E",
        "id": "RPC_NT_ENTRY_NOT_FOUND",
        "desc": "The entry was not found."
    },
    3221356608: {
        "hex": "0xC0020040",
        "id": "RPC_NT_INVALID_NAF_ID",
        "desc": "The network address family is invalid."
    },
    3221356610: {
        "hex": "0xC0020042",
        "id": "RPC_NT_NO_CONTEXT_AVAILABLE",
        "desc": "No security context is available to allow impersonation."
    },
    3221356612: {
        "hex": "0xC0020044",
        "id": "RPC_NT_ZERO_DIVIDE",
        "desc": "The RPC server attempted to divide an integer by zero."
    },
    3221356614: {
        "hex": "0xC0020046",
        "id": "RPC_NT_FP_DIV_ZERO",
        "desc": "A floating point operation at the RPC server caused a divide by zero."
    },
    3221356616: {
        "hex": "0xC0020048",
        "id": "RPC_NT_FP_OVERFLOW",
        "desc": "A floating point overflow occurred at the RPC server."
    },
    3221356618: {
        "hex": "0xC002004A",
        "id": "RPC_NT_NO_MORE_BINDINGS",
        "desc": "There are no more bindings."
    },
    3221356620: {
        "hex": "0xC002004C",
        "id": "EPT_NT_CANT_CREATE",
        "desc": "The endpoint mapper database entry could not be created."
    },
    3221356623: {
        "hex": "0xC002004F",
        "id": "RPC_NT_NO_INTERFACES",
        "desc": "No interfaces have been registered."
    },
    3221356625: {
        "hex": "0xC0020051",
        "id": "RPC_NT_BINDING_INCOMPLETE",
        "desc": "The binding handle does not contain all the required information."
    },
    3221356627: {
        "hex": "0xC0020053",
        "id": "RPC_NT_UNSUPPORTED_AUTHN_LEVEL",
        "desc": "The requested authentication level is not supported."
    },
    3221356629: {
        "hex": "0xC0020055",
        "id": "RPC_NT_NOT_RPC_ERROR",
        "desc": "The error specified is not a valid Windows RPC error code."
    },
    3221356632: {
        "hex": "0xC0020058",
        "id": "RPC_NT_NOT_CANCELLED",
        "desc": "The thread was not canceled."
    },
    3221356643: {
        "hex": "0xC0020063",
        "id": "RPC_NT_INVALID_ASYNC_CALL",
        "desc": "Invalid asynchronous RPC call handle for this operation."
    },
    3221422081: {
        "hex": "0xC0030001",
        "id": "RPC_NT_NO_MORE_ENTRIES",
        "desc": "The list of RPC servers available for auto-handle binding has been exhausted."
    },
    3221422083: {
        "hex": "0xC0030003",
        "id": "RPC_NT_SS_CHAR_TRANS_SHORT_FILE",
        "desc": "The file containing the character translation table has fewer than 512 bytes."
    },
    3221422085: {
        "hex": "0xC0030005",
        "id": "RPC_NT_SS_CONTEXT_MISMATCH",
        "desc": "The context handle does not match any known context handles."
    },
    3221422087: {
        "hex": "0xC0030007",
        "id": "RPC_NT_SS_HANDLES_MISMATCH",
        "desc": "The binding handles passed to an RPC do not match."
    },
    3221422089: {
        "hex": "0xC0030009",
        "id": "RPC_NT_NULL_REF_POINTER",
        "desc": "A null reference pointer was passed to the stub."
    },
    3221422091: {
        "hex": "0xC003000B",
        "id": "RPC_NT_BYTE_COUNT_TOO_SMALL",
        "desc": "The byte count is too small."
    },
    3221422169: {
        "hex": "0xC0030059",
        "id": "RPC_NT_INVALID_ES_ACTION",
        "desc": "Invalid operation on the encoding/decoding handle."
    },
    3221422171: {
        "hex": "0xC003005B",
        "id": "RPC_NT_WRONG_STUB_VERSION",
        "desc": "Incompatible version of the RPC stub."
    },
    3221422173: {
        "hex": "0xC003005D",
        "id": "RPC_NT_INVALID_PIPE_OPERATION",
        "desc": "An invalid operation was attempted on an RPC pipe object."
    },
    3221422175: {
        "hex": "0xC003005F",
        "id": "RPC_NT_PIPE_CLOSED",
        "desc": "The RPC pipe object has already been closed."
    },
    3221422177: {
        "hex": "0xC0030061",
        "id": "RPC_NT_PIPE_EMPTY",
        "desc": "No more data is available from the RPC pipe."
    },
    3221487670: {
        "hex": "0xC0040036",
        "id": "STATUS_PNP_TRANSLATION_FAILED",
        "desc": "A translator failed to translate resources."
    },
    3221487672: {
        "hex": "0xC0040038",
        "id": "STATUS_PNP_INVALID_ID",
        "desc": "Driver %2 returned an invalid ID for a child device (%3)."
    },
    3221880833: {
        "hex": "0xC00A0001",
        "id": "STATUS_CTX_WINSTATION_NAME_INVALID",
        "desc": "Session name %1 is invalid."
    },
    3221880835: {
        "hex": "0xC00A0003",
        "id": "STATUS_CTX_PD_NOT_FOUND",
        "desc": "The protocol driver %1 was not found in the system path."
    },
    3221880839: {
        "hex": "0xC00A0007",
        "id": "STATUS_CTX_NO_OUTBUF",
        "desc": "No free output buffers are available."
    },
    3221880841: {
        "hex": "0xC00A0009",
        "id": "STATUS_CTX_INVALID_MODEMNAME",
        "desc": "The modem (%1) was not found in the MODEM.INF file."
    },
    3221880843: {
        "hex": "0xC00A000B",
        "id": "STATUS_CTX_MODEM_RESPONSE_TIMEOUT",
        "desc": "The modem did not respond to the command sent to it. Verify that the modem cable is properly attached and the modem is turned on."
    },
    3221880845: {
        "hex": "0xC00A000D",
        "id": "STATUS_CTX_MODEM_RESPONSE_NO_DIALTONE",
        "desc": "A dial tone was not detected within the required time. Verify that the phone cable is properly attached and functional."
    },
    3221880847: {
        "hex": "0xC00A000F",
        "id": "STATUS_CTX_MODEM_RESPONSE_VOICE",
        "desc": "A voice was detected at a remote site on callback."
    },
    3221880850: {
        "hex": "0xC00A0012",
        "id": "STATUS_CTX_LICENSE_CLIENT_INVALID",
        "desc": "The client you are using is not licensed to use this system. Your logon request is denied."
    },
    3221880852: {
        "hex": "0xC00A0014",
        "id": "STATUS_CTX_LICENSE_EXPIRED",
        "desc": "The system license has expired. Your logon request is denied."
    },
    3221880854: {
        "hex": "0xC00A0016",
        "id": "STATUS_CTX_WINSTATION_NAME_COLLISION",
        "desc": "The specified session name is already in use."
    },
    3221880856: {
        "hex": "0xC00A0018",
        "id": "STATUS_CTX_BAD_VIDEO_MODE",
        "desc": "An attempt has been made to connect to a session whose video mode is not supported by the current client."
    },
    3221880868: {
        "hex": "0xC00A0024",
        "id": "STATUS_CTX_NOT_CONSOLE",
        "desc": "The requested operation can be performed only on the system console. This is most often the result of a driver or system DLL requiring direct console access."
    },
    3221880871: {
        "hex": "0xC00A0027",
        "id": "STATUS_CTX_CONSOLE_DISCONNECT",
        "desc": "Disconnecting the console session is not supported."
    },
    3221880874: {
        "hex": "0xC00A002A",
        "id": "STATUS_CTX_SHADOW_DENIED",
        "desc": "The request to control another session remotely was denied."
    },
    3221880878: {
        "hex": "0xC00A002E",
        "id": "STATUS_CTX_INVALID_WD",
        "desc": "The terminal connection driver %1 is invalid."
    },
    3221880880: {
        "hex": "0xC00A0030",
        "id": "STATUS_CTX_SHADOW_INVALID",
        "desc": "The requested session cannot be controlled remotely. You cannot control your own session, a session that is trying to control your session, a session that has no user logged on, or other sessions from the console."
    },
    3221880882: {
        "hex": "0xC00A0032",
        "id": "STATUS_RDP_PROTOCOL_ERROR",
        "desc": "The RDP protocol component %2 detected an error in the protocol stream and has disconnected the client."
    },
    3221880884: {
        "hex": "0xC00A0034",
        "id": "STATUS_CTX_CLIENT_LICENSE_IN_USE",
        "desc": "Your request to connect to this terminal server has been rejected. Your terminal server client license number is currently being used by another user. Contact your system administrator to obtain a new copy of the terminal server client with a valid, unique license number. Click OK to continue."
    },
    3221880886: {
        "hex": "0xC00A0036",
        "id": "STATUS_CTX_SHADOW_NOT_RUNNING",
        "desc": "Remote control could not be terminated because the specified session is not currently being remotely controlled."
    },
    3221880888: {
        "hex": "0xC00A0038",
        "id": "STATUS_CTX_SECURITY_LAYER_ERROR",
        "desc": "The terminal server security layer detected an error in the protocol stream and has disconnected the client."
    },
    3221946369: {
        "hex": "0xC00B0001",
        "id": "STATUS_MUI_FILE_NOT_FOUND",
        "desc": "The resource loader failed to find an MUI file."
    },
    3221946371: {
        "hex": "0xC00B0003",
        "id": "STATUS_MUI_INVALID_RC_CONFIG",
        "desc": "The RC manifest is corrupted with garbage data, is an unsupported version, or is missing a required item."
    },
    3221946373: {
        "hex": "0xC00B0005",
        "id": "STATUS_MUI_INVALID_ULTIMATEFALLBACK_NAME",
        "desc": "The RC manifest has and invalid ultimate fallback name."
    },
    3221946375: {
        "hex": "0xC00B0007",
        "id": "STATUS_RESOURCE_ENUM_USER_STOP",
        "desc": "The user stopped resource enumeration."
    },
    3222470658: {
        "hex": "0xC0130002",
        "id": "STATUS_CLUSTER_NODE_EXISTS",
        "desc": "The cluster node already exists."
    },
    3222470660: {
        "hex": "0xC0130004",
        "id": "STATUS_CLUSTER_NODE_NOT_FOUND",
        "desc": "The cluster node was not found."
    },
    3222470662: {
        "hex": "0xC0130006",
        "id": "STATUS_CLUSTER_NETWORK_EXISTS",
        "desc": "The cluster network already exists."
    },
    3222470664: {
        "hex": "0xC0130008",
        "id": "STATUS_CLUSTER_NETINTERFACE_EXISTS",
        "desc": "The cluster network interface already exists."
    },
    3222470666: {
        "hex": "0xC013000A",
        "id": "STATUS_CLUSTER_INVALID_REQUEST",
        "desc": "The cluster request is not valid for this object."
    },
    3222470668: {
        "hex": "0xC013000C",
        "id": "STATUS_CLUSTER_NODE_DOWN",
        "desc": "The cluster node is down."
    },
    3222470670: {
        "hex": "0xC013000E",
        "id": "STATUS_CLUSTER_NODE_NOT_MEMBER",
        "desc": "The cluster node is not a member of the cluster."
    },
    3222470672: {
        "hex": "0xC0130010",
        "id": "STATUS_CLUSTER_INVALID_NETWORK",
        "desc": "The cluster network is not valid."
    },
    3222470674: {
        "hex": "0xC0130012",
        "id": "STATUS_CLUSTER_NODE_UP",
        "desc": "The cluster node is up."
    },
    3222470676: {
        "hex": "0xC0130014",
        "id": "STATUS_CLUSTER_NODE_NOT_PAUSED",
        "desc": "The cluster node is not paused."
    },
    3222470678: {
        "hex": "0xC0130016",
        "id": "STATUS_CLUSTER_NETWORK_NOT_INTERNAL",
        "desc": "The cluster network is not configured for internal cluster communication."
    },
    3222536193: {
        "hex": "0xC0140001",
        "id": "STATUS_ACPI_INVALID_OPCODE",
        "desc": "An attempt was made to run an invalid AML opcode."
    },
    3222536195: {
        "hex": "0xC0140003",
        "id": "STATUS_ACPI_ASSERT_FAILED",
        "desc": "An inconsistent state has occurred."
    },
    3222536197: {
        "hex": "0xC0140005",
        "id": "STATUS_ACPI_INVALID_ARGUMENT",
        "desc": "A required argument was not specified."
    },
    3222536199: {
        "hex": "0xC0140007",
        "id": "STATUS_ACPI_INVALID_SUPERNAME",
        "desc": "An invalid SuperName was specified."
    },
    3222536201: {
        "hex": "0xC0140009",
        "id": "STATUS_ACPI_INVALID_OBJTYPE",
        "desc": "An object with an incorrect type was specified."
    },
    3222536203: {
        "hex": "0xC014000B",
        "id": "STATUS_ACPI_INCORRECT_ARGUMENT_COUNT",
        "desc": "An incorrect number of arguments was specified."
    },
    3222536205: {
        "hex": "0xC014000D",
        "id": "STATUS_ACPI_INVALID_EVENTTYPE",
        "desc": "An incorrect event type was specified."
    },
    3222536207: {
        "hex": "0xC014000F",
        "id": "STATUS_ACPI_INVALID_DATA",
        "desc": "Invalid data for the target was specified."
    },
    3222536209: {
        "hex": "0xC0140011",
        "id": "STATUS_ACPI_INVALID_ACCESS_SIZE",
        "desc": "An attempt was made to access a field outside the defined range."
    },
    3222536211: {
        "hex": "0xC0140013",
        "id": "STATUS_ACPI_ALREADY_INITIALIZED",
        "desc": "An attempt was made to reinitialize the ACPI subsystem."
    },
    3222536213: {
        "hex": "0xC0140015",
        "id": "STATUS_ACPI_INVALID_MUTEX_LEVEL",
        "desc": "An incorrect mutex was specified."
    },
    3222536215: {
        "hex": "0xC0140017",
        "id": "STATUS_ACPI_MUTEX_NOT_OWNER",
        "desc": "An attempt was made to access the mutex by a process that was not the owner."
    },
    3222536217: {
        "hex": "0xC0140019",
        "id": "STATUS_ACPI_INVALID_TABLE",
        "desc": "An attempt was made to use an incorrect table."
    },
    3222536225: {
        "hex": "0xC0140021",
        "id": "STATUS_ACPI_POWER_REQUEST_FAILED",
        "desc": "An ACPI power object failed to transition state."
    },
    3222601730: {
        "hex": "0xC0150002",
        "id": "STATUS_SXS_CANT_GEN_ACTCTX",
        "desc": "Windows was unble to process the application binding information. Refer to the system event log for further information."
    },
    3222601732: {
        "hex": "0xC0150004",
        "id": "STATUS_SXS_ASSEMBLY_NOT_FOUND",
        "desc": "The referenced assembly is not installed on the system."
    },
    3222601734: {
        "hex": "0xC0150006",
        "id": "STATUS_SXS_MANIFEST_PARSE_ERROR",
        "desc": "The manifest file contains one or more syntax errors."
    },
    3222601736: {
        "hex": "0xC0150008",
        "id": "STATUS_SXS_KEY_NOT_FOUND",
        "desc": "The requested lookup key was not found in any active activation context."
    },
    3222601738: {
        "hex": "0xC015000A",
        "id": "STATUS_SXS_WRONG_SECTION_TYPE",
        "desc": "The type requested activation context section does not match the query API used."
    },
    3222601740: {
        "hex": "0xC015000C",
        "id": "STATUS_SXS_ASSEMBLY_MISSING",
        "desc": "The referenced assembly could not be found."
    },
    3222601743: {
        "hex": "0xC015000F",
        "id": "STATUS_SXS_EARLY_DEACTIVATION",
        "desc": "The activation context being deactivated is not the most recently activated one."
    },
    3222601745: {
        "hex": "0xC0150011",
        "id": "STATUS_SXS_MULTIPLE_DEACTIVATION",
        "desc": "The activation context being deactivated has already been deactivated."
    },
    3222601747: {
        "hex": "0xC0150013",
        "id": "STATUS_SXS_PROCESS_TERMINATION_REQUESTED",
        "desc": "A component used by the isolation facility has requested that the process be terminated."
    },
    3222601749: {
        "hex": "0xC0150015",
        "id": "STATUS_SXS_CORRUPTION",
        "desc": "The application isolation metadata for this process or thread has become corrupt."
    },
    3222601751: {
        "hex": "0xC0150017",
        "id": "STATUS_SXS_INVALID_IDENTITY_ATTRIBUTE_NAME",
        "desc": "The name of an attribute in an identity is not within the legal range."
    },
    3222601753: {
        "hex": "0xC0150019",
        "id": "STATUS_SXS_IDENTITY_PARSE_ERROR",
        "desc": "The identity string is malformed. This might be due to a trailing comma, more than two unnamed attributes, a missing attribute name, or a missing attribute value."
    },
    3222601755: {
        "hex": "0xC015001B",
        "id": "STATUS_SXS_FILE_HASH_MISMATCH",
        "desc": "A component's file does not match the verification information present in the component manifest."
    },
    3222601757: {
        "hex": "0xC015001D",
        "id": "STATUS_SXS_IDENTITIES_DIFFERENT",
        "desc": "The component identities are different."
    },
    3222601759: {
        "hex": "0xC015001F",
        "id": "STATUS_SXS_FILE_NOT_PART_OF_ASSEMBLY",
        "desc": "The file is not a part of the assembly."
    },
    3222601761: {
        "hex": "0xC0150021",
        "id": "STATUS_XML_ENCODING_MISMATCH",
        "desc": "The character encoding in the XML declaration did not match the encoding used in the document."
    },
    3222601763: {
        "hex": "0xC0150023",
        "id": "STATUS_SXS_SETTING_NOT_REGISTERED",
        "desc": "The setting is not registered."
    },
    3222601765: {
        "hex": "0xC0150025",
        "id": "STATUS_SMI_PRIMITIVE_INSTALLER_FAILED",
        "desc": "The SMI primitive installer failed during setup or servicing."
    },
    3222601767: {
        "hex": "0xC0150027",
        "id": "STATUS_SXS_FILE_HASH_MISSING",
        "desc": "A component is missing file verification information in its manifest."
    },
    3222863874: {
        "hex": "0xC0190002",
        "id": "STATUS_INVALID_TRANSACTION",
        "desc": "The transaction handle associated with this operation is invalid."
    },
    3222863876: {
        "hex": "0xC0190004",
        "id": "STATUS_TM_INITIALIZATION_FAILED",
        "desc": "The transaction manager was unable to be successfully initialized. Transacted operations are not supported."
    },
    3222863878: {
        "hex": "0xC0190006",
        "id": "STATUS_RM_METADATA_CORRUPT",
        "desc": "The metadata of the resource manager has been corrupted. The resource manager will not function."
    },
    3222863880: {
        "hex": "0xC0190008",
        "id": "STATUS_DIRECTORY_NOT_RM",
        "desc": "The specified directory does not contain a file system resource manager."
    },
    3222863883: {
        "hex": "0xC019000B",
        "id": "STATUS_LOG_RESIZE_INVALID_SIZE",
        "desc": "The requested log size for the file system resource manager is invalid."
    },
    3222863887: {
        "hex": "0xC019000F",
        "id": "STATUS_CRM_PROTOCOL_ALREADY_EXISTS",
        "desc": "The resource manager tried to register a protocol that already exists."
    },
    3222863889: {
        "hex": "0xC0190011",
        "id": "STATUS_CRM_PROTOCOL_NOT_FOUND",
        "desc": "The requested propagation protocol was not registered as a CRM."
    },
    3222863891: {
        "hex": "0xC0190013",
        "id": "STATUS_TRANSACTION_REQUEST_NOT_VALID",
        "desc": "The requested operation is not valid on the transaction object in its current state."
    },
    3222863893: {
        "hex": "0xC0190015",
        "id": "STATUS_TRANSACTION_ALREADY_ABORTED",
        "desc": "It is too late to perform the requested operation, because the transaction has already been aborted."
    },
    3222863895: {
        "hex": "0xC0190017",
        "id": "STATUS_TRANSACTION_INVALID_MARSHALL_BUFFER",
        "desc": "The buffer passed in to NtPushTransaction or NtPullTransaction is not in a valid format."
    },
    3222863897: {
        "hex": "0xC0190019",
        "id": "STATUS_LOG_GROWTH_FAILED",
        "desc": "An attempt to create space in the transactional resource manager's log failed. The failure status has been recorded in the event log."
    },
    3222863906: {
        "hex": "0xC0190022",
        "id": "STATUS_STREAM_MINIVERSION_NOT_FOUND",
        "desc": "The specified file miniversion was not found for this transacted file open."
    },
    3222863908: {
        "hex": "0xC0190024",
        "id": "STATUS_MINIVERSION_INACCESSIBLE_FROM_SPECIFIED_TRANSACTION",
        "desc": "A miniversion can be opened only in the context of the transaction that created it."
    },
    3222863910: {
        "hex": "0xC0190026",
        "id": "STATUS_CANT_CREATE_MORE_STREAM_MINIVERSIONS",
        "desc": "It is not possible to create any more miniversions for this stream."
    },
    3222863920: {
        "hex": "0xC0190030",
        "id": "STATUS_LOG_CORRUPTION_DETECTED",
        "desc": "The log data is corrupt."
    },
    3222863923: {
        "hex": "0xC0190033",
        "id": "STATUS_ENLISTMENT_NOT_SUPERIOR",
        "desc": "The request was rejected because the enlistment in question is not a superior enlistment."
    },
    3222863927: {
        "hex": "0xC0190037",
        "id": "STATUS_CANT_BREAK_TRANSACTIONAL_DEPENDENCY",
        "desc": "The operation cannot be performed because another transaction is depending on this property not changing."
    },
    3222863929: {
        "hex": "0xC0190039",
        "id": "STATUS_TXF_DIR_NOT_EMPTY",
        "desc": "The $Txf directory must be empty for this operation to succeed."
    },
    3222863931: {
        "hex": "0xC019003B",
        "id": "STATUS_TM_VOLATILE",
        "desc": "The operation could not be completed because the transaction manager does not have a log."
    },
    3222863933: {
        "hex": "0xC019003D",
        "id": "STATUS_TXF_ATTRIBUTE_CORRUPT",
        "desc": "The transactional metadata attribute on the file or directory %hs is corrupt and unreadable."
    },
    3222863935: {
        "hex": "0xC019003F",
        "id": "STATUS_TRANSACTIONAL_OPEN_NOT_ALLOWED",
        "desc": "This object is not allowed to be opened in a transaction."
    },
    3222863939: {
        "hex": "0xC0190043",
        "id": "STATUS_TRANSACTION_REQUIRED_PROMOTION",
        "desc": "Promotion was required to allow the resource manager to enlist, but the transaction was set to disallow it."
    },
    3222863941: {
        "hex": "0xC0190045",
        "id": "STATUS_TRANSACTIONS_NOT_FROZEN",
        "desc": "The request to thaw frozen transactions was ignored because transactions were not previously frozen."
    },
    3222863943: {
        "hex": "0xC0190047",
        "id": "STATUS_NOT_SNAPSHOT_VOLUME",
        "desc": "The target volume is not a snapshot volume. This operation is valid only on a volume mounted as a snapshot."
    },
    3222863945: {
        "hex": "0xC0190049",
        "id": "STATUS_SPARSE_NOT_ALLOWED_IN_TRANSACTION",
        "desc": "The sparse operation could not be completed because a transaction is active on the file."
    },
    3222863947: {
        "hex": "0xC019004B",
        "id": "STATUS_FLOATED_SECTION",
        "desc": "I/O was attempted on a section object that has been floated as a result of a transaction ending. There is no valid data."
    },
    3222863949: {
        "hex": "0xC019004D",
        "id": "STATUS_CANNOT_ABORT_TRANSACTIONS",
        "desc": "The transactional resource manager had too many transactions outstanding that could not be aborted. The transactional resource manager has been shut down."
    },
    3222863951: {
        "hex": "0xC019004F",
        "id": "STATUS_RESOURCEMANAGER_NOT_FOUND",
        "desc": "The specified resource manager was unable to be opened because it was not found."
    },
    3222863953: {
        "hex": "0xC0190051",
        "id": "STATUS_TRANSACTIONMANAGER_NOT_FOUND",
        "desc": "The specified transaction manager was unable to be opened because it was not found."
    },
    3222863955: {
        "hex": "0xC0190053",
        "id": "STATUS_TRANSACTIONMANAGER_RECOVERY_NAME_COLLISION",
        "desc": "The specified transaction manager was unable to create the objects contained in its log file in the Ob namespace. Therefore, the transaction manager was unable to recover."
    },
    3222863957: {
        "hex": "0xC0190055",
        "id": "STATUS_TRANSACTION_OBJECT_EXPIRED",
        "desc": "Because the associated transaction manager or resource manager has been closed, the handle is no longer valid."
    },
    3222863959: {
        "hex": "0xC0190057",
        "id": "STATUS_TRANSACTION_RESPONSE_NOT_ENLISTED",
        "desc": "The specified operation could not be performed on this superior enlistment because the enlistment was not created with the corresponding completion response in the NotificationMask."
    },
    3222863961: {
        "hex": "0xC0190059",
        "id": "STATUS_NO_LINK_TRACKING_IN_TRANSACTION",
        "desc": "The link-tracking operation could not be completed because a transaction is active."
    },
    3222863963: {
        "hex": "0xC019005B",
        "id": "STATUS_TRANSACTION_INTEGRITY_VIOLATED",
        "desc": "The kernel transaction manager had to abort or forget the transaction because it blocked forward progress."
    },
    3222863969: {
        "hex": "0xC0190061",
        "id": "STATUS_TRANSACTION_NOT_ENLISTED",
        "desc": "The specified operation could not be performed because the resource manager is not enlisted in the transaction."
    },
    3222929410: {
        "hex": "0xC01A0002",
        "id": "STATUS_LOG_SECTOR_PARITY_INVALID",
        "desc": "The log service encountered a log sector with invalid block parity."
    },
    3222929412: {
        "hex": "0xC01A0004",
        "id": "STATUS_LOG_BLOCK_INCOMPLETE",
        "desc": "The log service encountered a partial or incomplete log block."
    },
    3222929414: {
        "hex": "0xC01A0006",
        "id": "STATUS_LOG_BLOCKS_EXHAUSTED",
        "desc": "The log service user-log marshaling buffers are exhausted."
    },
    3222929416: {
        "hex": "0xC01A0008",
        "id": "STATUS_LOG_RESTART_INVALID",
        "desc": "The log service encountered an invalid log restart area."
    },
    3222929418: {
        "hex": "0xC01A000A",
        "id": "STATUS_LOG_BLOCK_INVALID",
        "desc": "The log service encountered an invalid log block."
    },
    3222929421: {
        "hex": "0xC01A000D",
        "id": "STATUS_LOG_METADATA_CORRUPT",
        "desc": "The log service encountered a corrupted metadata file."
    },
    3222929423: {
        "hex": "0xC01A000F",
        "id": "STATUS_LOG_METADATA_INCONSISTENT",
        "desc": "The log service encountered a metadata file with inconsistent data."
    },
    3222929425: {
        "hex": "0xC01A0011",
        "id": "STATUS_LOG_CANT_DELETE",
        "desc": "The log service cannot delete the log file or the file system container."
    },
    3222929427: {
        "hex": "0xC01A0013",
        "id": "STATUS_LOG_START_OF_LOG",
        "desc": "The log service has attempted to read or write backward past the start of the log."
    },
    3222929429: {
        "hex": "0xC01A0015",
        "id": "STATUS_LOG_POLICY_NOT_INSTALLED",
        "desc": "The log policy in question was not installed at the time of the request."
    },
    3222929431: {
        "hex": "0xC01A0017",
        "id": "STATUS_LOG_POLICY_CONFLICT",
        "desc": "A policy on the log in question prevented the operation from completing."
    },
    3222929433: {
        "hex": "0xC01A0019",
        "id": "STATUS_LOG_RECORD_NONEXISTENT",
        "desc": "The log record is not a record in the log file."
    },
    3222929435: {
        "hex": "0xC01A001B",
        "id": "STATUS_LOG_SPACE_RESERVED_INVALID",
        "desc": "The reserved log space or the adjustment of the log space is invalid."
    },
    3222929437: {
        "hex": "0xC01A001D",
        "id": "STATUS_LOG_FULL",
        "desc": "The log space is exhausted."
    },
    3222929439: {
        "hex": "0xC01A001F",
        "id": "STATUS_LOG_DEDICATED",
        "desc": "The operation failed because the log is dedicated."
    },
    3222929441: {
        "hex": "0xC01A0021",
        "id": "STATUS_LOG_ARCHIVE_IN_PROGRESS",
        "desc": "Log archival is in progress."
    },
    3222929443: {
        "hex": "0xC01A0023",
        "id": "STATUS_LOG_NOT_ENOUGH_CONTAINERS",
        "desc": "The log must have at least two containers before it can be read from or written to."
    },
    3222929445: {
        "hex": "0xC01A0025",
        "id": "STATUS_LOG_CLIENT_NOT_REGISTERED",
        "desc": "A log client has not been registered on the stream."
    },
    3222929447: {
        "hex": "0xC01A0027",
        "id": "STATUS_LOG_CONTAINER_READ_FAILED",
        "desc": "The log service encountered an error when attempting to read from a log container."
    },
    3222929449: {
        "hex": "0xC01A0029",
        "id": "STATUS_LOG_CONTAINER_OPEN_FAILED",
        "desc": "The log service encountered an error when attempting to open a log container."
    },
    3222929451: {
        "hex": "0xC01A002B",
        "id": "STATUS_LOG_STATE_INVALID",
        "desc": "The log service is not in the correct state to perform a requested action."
    },
    3222929453: {
        "hex": "0xC01A002D",
        "id": "STATUS_LOG_METADATA_FLUSH_FAILED",
        "desc": "The log metadata flush failed."
    },
    3222929455: {
        "hex": "0xC01A002F",
        "id": "STATUS_LOG_APPENDED_FLUSH_FAILED",
        "desc": "Records were appended to the log or reservation changes were made, but the log could not be flushed."
    },
    3222995178: {
        "hex": "0xC01B00EA",
        "id": "STATUS_VIDEO_HUNG_DISPLAY_DRIVER_THREAD",
        "desc": "{Display Driver Stopped Responding} The %hs display driver has stopped working normally. Save your work and reboot the system to restore full display functionality. The next time you reboot the computer, a dialog box will allow you to upload data about this failure to Microsoft."
    },
    3223060482: {
        "hex": "0xC01C0002",
        "id": "STATUS_FLT_CONTEXT_ALREADY_DEFINED",
        "desc": "A context is already defined for this object."
    },
    3223060484: {
        "hex": "0xC01C0004",
        "id": "STATUS_FLT_DISALLOW_FAST_IO",
        "desc": "This is an internal error code used by the filter manager to determine if a fast I/O operation should be forced down the input/output request packet (IRP) path. Minifilters should never return this value."
    },
    3223060486: {
        "hex": "0xC01C0006",
        "id": "STATUS_FLT_NOT_SAFE_TO_POST_OPERATION",
        "desc": "Posting this operation to a worker thread for further processing is not safe at this time because it could lead to a system deadlock."
    },
    3223060488: {
        "hex": "0xC01C0008",
        "id": "STATUS_FLT_FILTER_NOT_READY",
        "desc": "The filter is not ready for attachment to volumes because it has not finished initializing (FltStartFiltering has not been called)."
    },
    3223060490: {
        "hex": "0xC01C000A",
        "id": "STATUS_FLT_INTERNAL_ERROR",
        "desc": "The Filter Manager had an internal error from which it cannot recover; therefore, the operation has failed. This is usually the result of a filter returning an invalid value from a pre-operation callback."
    },
    3223060492: {
        "hex": "0xC01C000C",
        "id": "STATUS_FLT_MUST_BE_NONPAGED_POOL",
        "desc": "A nonpaged pool must be used for this type of context."
    },
    3223060494: {
        "hex": "0xC01C000E",
        "id": "STATUS_FLT_CBDQ_DISABLED",
        "desc": "The callback data queue has been disabled."
    },
    3223060496: {
        "hex": "0xC01C0010",
        "id": "STATUS_FLT_DO_NOT_DETACH",
        "desc": "Do not detach the filter from the volume at this time."
    },
    3223060498: {
        "hex": "0xC01C0012",
        "id": "STATUS_FLT_INSTANCE_NAME_COLLISION",
        "desc": "An instance already exists with this name on the volume specified."
    },
    3223060500: {
        "hex": "0xC01C0014",
        "id": "STATUS_FLT_VOLUME_NOT_FOUND",
        "desc": "The system could not find the volume specified."
    },
    3223060502: {
        "hex": "0xC01C0016",
        "id": "STATUS_FLT_CONTEXT_ALLOCATION_NOT_FOUND",
        "desc": "No registered context allocation definition was found for the given request."
    },
    3223060504: {
        "hex": "0xC01C0018",
        "id": "STATUS_FLT_NAME_CACHE_MISS",
        "desc": "The name requested was not found in the Filter Manager name cache and could not be retrieved from the file system."
    },
    3223060506: {
        "hex": "0xC01C001A",
        "id": "STATUS_FLT_VOLUME_ALREADY_MOUNTED",
        "desc": "The specified volume is already mounted."
    },
    3223060508: {
        "hex": "0xC01C001C",
        "id": "STATUS_FLT_CONTEXT_ALREADY_LINKED",
        "desc": "The specified context is already attached to another object."
    },
    3223126017: {
        "hex": "0xC01D0001",
        "id": "STATUS_MONITOR_NO_DESCRIPTOR",
        "desc": "A monitor descriptor could not be obtained."
    },
    3223126019: {
        "hex": "0xC01D0003",
        "id": "STATUS_MONITOR_INVALID_DESCRIPTOR_CHECKSUM",
        "desc": "The checksum of the obtained monitor descriptor is invalid."
    },
    3223126021: {
        "hex": "0xC01D0005",
        "id": "STATUS_MONITOR_WMI_DATABLOCK_REGISTRATION_FAILED",
        "desc": "WMI data-block registration failed for one of the MSMonitorClass WMI subclasses."
    },
    3223126023: {
        "hex": "0xC01D0007",
        "id": "STATUS_MONITOR_INVALID_USER_FRIENDLY_MONDSC_BLOCK",
        "desc": "The provided monitor descriptor block is either corrupted or does not contain the monitor's user-friendly name."
    },
    3223126025: {
        "hex": "0xC01D0009",
        "id": "STATUS_MONITOR_INVALID_DETAILED_TIMING_BLOCK",
        "desc": "The monitor descriptor contains an invalid detailed timing block."
    },
    3223191552: {
        "hex": "0xC01E0000",
        "id": "STATUS_GRAPHICS_NOT_EXCLUSIVE_MODE_OWNER",
        "desc": "Exclusive mode ownership is needed to create an unmanaged primary allocation."
    },
    3223191554: {
        "hex": "0xC01E0002",
        "id": "STATUS_GRAPHICS_INVALID_DISPLAY_ADAPTER",
        "desc": "The specified display adapter handle is invalid."
    },
    3223191556: {
        "hex": "0xC01E0004",
        "id": "STATUS_GRAPHICS_INVALID_DRIVER_MODEL",
        "desc": "The driver stack does not match the expected driver model."
    },
    3223191558: {
        "hex": "0xC01E0006",
        "id": "STATUS_GRAPHICS_PRESENT_OCCLUDED",
        "desc": "Nothing to present due to desktop occlusion."
    },
    3223191560: {
        "hex": "0xC01E0008",
        "id": "STATUS_GRAPHICS_CANNOTCOLORCONVERT",
        "desc": "Not able to present with color conversion."
    },
    3223191564: {
        "hex": "0xC01E000C",
        "id": "STATUS_GRAPHICS_PRESENT_UNOCCLUDED",
        "desc": "Previous exclusive VidPn source owner has released its ownership"
    },
    3223191809: {
        "hex": "0xC01E0101",
        "id": "STATUS_GRAPHICS_CANT_LOCK_MEMORY",
        "desc": "Could not probe and lock the underlying memory of an allocation."
    },
    3223191811: {
        "hex": "0xC01E0103",
        "id": "STATUS_GRAPHICS_TOO_MANY_REFERENCES",
        "desc": "An object being referenced has already reached the maximum reference count and cannot be referenced further."
    },
    3223191813: {
        "hex": "0xC01E0105",
        "id": "STATUS_GRAPHICS_TRY_AGAIN_NOW",
        "desc": "A problem could not be solved due to an existing condition. Try again now."
    },
    3223191815: {
        "hex": "0xC01E0107",
        "id": "STATUS_GRAPHICS_UNSWIZZLING_APERTURE_UNAVAILABLE",
        "desc": "No more unswizzling apertures are currently available."
    },
    3223191817: {
        "hex": "0xC01E0109",
        "id": "STATUS_GRAPHICS_CANT_EVICT_PINNED_ALLOCATION",
        "desc": "The request failed because a pinned allocation cannot be evicted."
    },
    3223191825: {
        "hex": "0xC01E0111",
        "id": "STATUS_GRAPHICS_CANT_RENDER_LOCKED_ALLOCATION",
        "desc": "A locked allocation cannot be used in the current command buffer."
    },
    3223191827: {
        "hex": "0xC01E0113",
        "id": "STATUS_GRAPHICS_INVALID_ALLOCATION_INSTANCE",
        "desc": "An invalid allocation instance is being referenced."
    },
    3223191829: {
        "hex": "0xC01E0115",
        "id": "STATUS_GRAPHICS_WRONG_ALLOCATION_DEVICE",
        "desc": "The allocation being referenced does not belong to the current device."
    },
    3223192064: {
        "hex": "0xC01E0200",
        "id": "STATUS_GRAPHICS_GPU_EXCEPTION_ON_DEVICE",
        "desc": "A GPU exception was detected on the given device. The device cannot be scheduled."
    },
    3223192321: {
        "hex": "0xC01E0301",
        "id": "STATUS_GRAPHICS_VIDPN_TOPOLOGY_NOT_SUPPORTED",
        "desc": "The specified VidPN topology is valid but is not supported by this model of the display adapter."
    },
    3223192323: {
        "hex": "0xC01E0303",
        "id": "STATUS_GRAPHICS_INVALID_VIDPN",
        "desc": "The specified VidPN handle is invalid."
    },
    3223192325: {
        "hex": "0xC01E0305",
        "id": "STATUS_GRAPHICS_INVALID_VIDEO_PRESENT_TARGET",
        "desc": "The specified video present target is invalid."
    },
    3223192328: {
        "hex": "0xC01E0308",
        "id": "STATUS_GRAPHICS_INVALID_VIDPN_SOURCEMODESET",
        "desc": "The specified VidPN source mode set is invalid."
    },
    3223192330: {
        "hex": "0xC01E030A",
        "id": "STATUS_GRAPHICS_INVALID_FREQUENCY",
        "desc": "The specified video signal frequency is invalid."
    },
    3223192332: {
        "hex": "0xC01E030C",
        "id": "STATUS_GRAPHICS_INVALID_TOTAL_REGION",
        "desc": "The specified video signal total region is invalid."
    },
    3223192337: {
        "hex": "0xC01E0311",
        "id": "STATUS_GRAPHICS_INVALID_VIDEO_PRESENT_TARGET_MODE",
        "desc": "The specified video present target mode is invalid."
    },
    3223192339: {
        "hex": "0xC01E0313",
        "id": "STATUS_GRAPHICS_PATH_ALREADY_IN_TOPOLOGY",
        "desc": "The specified video present path is already in the VidPN's topology."
    },
    3223192341: {
        "hex": "0xC01E0315",
        "id": "STATUS_GRAPHICS_INVALID_VIDEOPRESENTSOURCESET",
        "desc": "The specified video present source set is invalid."
    },
    3223192343: {
        "hex": "0xC01E0317",
        "id": "STATUS_GRAPHICS_SOURCE_ALREADY_IN_SET",
        "desc": "The specified video present source is already in the video present source set."
    },
    3223192345: {
        "hex": "0xC01E0319",
        "id": "STATUS_GRAPHICS_INVALID_VIDPN_PRESENT_PATH",
        "desc": "The specified VidPN present path is invalid."
    },
    3223192347: {
        "hex": "0xC01E031B",
        "id": "STATUS_GRAPHICS_INVALID_MONITOR_FREQUENCYRANGESET",
        "desc": "The specified monitor frequency range set is invalid."
    },
    3223192349: {
        "hex": "0xC01E031D",
        "id": "STATUS_GRAPHICS_FREQUENCYRANGE_NOT_IN_SET",
        "desc": "The specified frequency range is not in the specified monitor frequency range set."
    },
    3223192352: {
        "hex": "0xC01E0320",
        "id": "STATUS_GRAPHICS_STALE_MODESET",
        "desc": "The specified mode set is stale. Reacquire the new mode set."
    },
    3223192354: {
        "hex": "0xC01E0322",
        "id": "STATUS_GRAPHICS_INVALID_MONITOR_SOURCE_MODE",
        "desc": "The specified monitor source mode is invalid."
    },
    3223192356: {
        "hex": "0xC01E0324",
        "id": "STATUS_GRAPHICS_MODE_ID_MUST_BE_UNIQUE",
        "desc": "The ID of the specified mode is being used by another mode in the set."
    },
    3223192358: {
        "hex": "0xC01E0326",
        "id": "STATUS_GRAPHICS_VIDEO_PRESENT_TARGETS_LESS_THAN_SOURCES",
        "desc": "The number of video present targets must be greater than or equal to the number of video present sources."
    },
    3223192360: {
        "hex": "0xC01E0328",
        "id": "STATUS_GRAPHICS_ADAPTER_MUST_HAVE_AT_LEAST_ONE_SOURCE",
        "desc": "The display adapter must have at least one video present source."
    },
    3223192362: {
        "hex": "0xC01E032A",
        "id": "STATUS_GRAPHICS_INVALID_MONITORDESCRIPTORSET",
        "desc": "The specified monitor descriptor set is invalid."
    },
    3223192364: {
        "hex": "0xC01E032C",
        "id": "STATUS_GRAPHICS_MONITORDESCRIPTOR_NOT_IN_SET",
        "desc": "The specified descriptor is not in the specified monitor descriptor set."
    },
    3223192366: {
        "hex": "0xC01E032E",
        "id": "STATUS_GRAPHICS_MONITORDESCRIPTOR_ID_MUST_BE_UNIQUE",
        "desc": "The ID of the specified monitor descriptor is being used by another descriptor in the set."
    },
    3223192368: {
        "hex": "0xC01E0330",
        "id": "STATUS_GRAPHICS_RESOURCES_NOT_RELATED",
        "desc": "Two or more of the specified resources are not related to each other, as defined by the interface semantics."
    },
    3223192370: {
        "hex": "0xC01E0332",
        "id": "STATUS_GRAPHICS_TARGET_ID_MUST_BE_UNIQUE",
        "desc": "The ID of the specified video present target is being used by another target in the set."
    },
    3223192372: {
        "hex": "0xC01E0334",
        "id": "STATUS_GRAPHICS_MONITOR_COULD_NOT_BE_ASSOCIATED_WITH_ADAPTER",
        "desc": "The newly arrived monitor could not be associated with a display adapter."
    },
    3223192374: {
        "hex": "0xC01E0336",
        "id": "STATUS_GRAPHICS_NO_ACTIVE_VIDPN",
        "desc": "The VidPN manager of the particular display adapter does not have an active VidPN."
    },
    3223192376: {
        "hex": "0xC01E0338",
        "id": "STATUS_GRAPHICS_MONITOR_NOT_CONNECTED",
        "desc": "No monitor is connected on the specified video present target."
    },
    3223192378: {
        "hex": "0xC01E033A",
        "id": "STATUS_GRAPHICS_INVALID_PRIMARYSURFACE_SIZE",
        "desc": "The specified primary surface size is invalid."
    },
    3223192380: {
        "hex": "0xC01E033C",
        "id": "STATUS_GRAPHICS_INVALID_STRIDE",
        "desc": "The specified stride is invalid."
    },
    3223192382: {
        "hex": "0xC01E033E",
        "id": "STATUS_GRAPHICS_INVALID_COLORBASIS",
        "desc": "The specified color basis is invalid."
    },
    3223192384: {
        "hex": "0xC01E0340",
        "id": "STATUS_GRAPHICS_TARGET_NOT_IN_TOPOLOGY",
        "desc": "The specified target is not part of the specified VidPN's topology."
    },
    3223192386: {
        "hex": "0xC01E0342",
        "id": "STATUS_GRAPHICS_VIDPN_SOURCE_IN_USE",
        "desc": "The specified VidPN source is already owned by a DMM client and cannot be used until that client releases it."
    },
    3223192388: {
        "hex": "0xC01E0344",
        "id": "STATUS_GRAPHICS_INVALID_PATH_IMPORTANCE_ORDINAL",
        "desc": "The specified VidPN's present path importance ordinal is invalid."
    },
    3223192390: {
        "hex": "0xC01E0346",
        "id": "STATUS_GRAPHICS_PATH_CONTENT_GEOMETRY_TRANSFORMATION_NOT_SUPPORTED",
        "desc": "The specified content geometry transformation is not supported on the respective VidPN present path."
    },
    3223192392: {
        "hex": "0xC01E0348",
        "id": "STATUS_GRAPHICS_GAMMA_RAMP_NOT_SUPPORTED",
        "desc": "The specified gamma ramp is not supported on the respective VidPN present path."
    },
    3223192394: {
        "hex": "0xC01E034A",
        "id": "STATUS_GRAPHICS_MODE_NOT_IN_MODESET",
        "desc": "The specified mode is not in the specified mode set."
    },
    3223192398: {
        "hex": "0xC01E034E",
        "id": "STATUS_GRAPHICS_INVALID_PATH_CONTENT_TYPE",
        "desc": "The specified VidPN present path content type is invalid."
    },
    3223192400: {
        "hex": "0xC01E0350",
        "id": "STATUS_GRAPHICS_UNASSIGNED_MODESET_ALREADY_EXISTS",
        "desc": "Only one unassigned mode set can exist at any one time for a particular VidPN source or target."
    },
    3223192403: {
        "hex": "0xC01E0353",
        "id": "STATUS_GRAPHICS_TOPOLOGY_CHANGES_NOT_ALLOWED",
        "desc": "The topology changes are not allowed for the specified VidPN."
    },
    3223192405: {
        "hex": "0xC01E0355",
        "id": "STATUS_GRAPHICS_INCOMPATIBLE_PRIVATE_FORMAT",
        "desc": "The specified primary surface has a different private-format attribute than the current primary surface."
    },
    3223192407: {
        "hex": "0xC01E0357",
        "id": "STATUS_GRAPHICS_INVALID_MONITOR_CAPABILITY_ORIGIN",
        "desc": "The specified monitor-capability origin is invalid."
    },
    3223192409: {
        "hex": "0xC01E0359",
        "id": "STATUS_GRAPHICS_MAX_NUM_PATHS_REACHED",
        "desc": "The maximum supported number of present paths has been reached."
    },
    3223192411: {
        "hex": "0xC01E035B",
        "id": "STATUS_GRAPHICS_INVALID_CLIENT_TYPE",
        "desc": "The specified client type was not recognized."
    },
    3223192576: {
        "hex": "0xC01E0400",
        "id": "STATUS_GRAPHICS_SPECIFIED_CHILD_ALREADY_CONNECTED",
        "desc": "The specified display adapter child device already has an external device connected to it."
    },
    3223192624: {
        "hex": "0xC01E0430",
        "id": "STATUS_GRAPHICS_NOT_A_LINKED_ADAPTER",
        "desc": "The display adapter is not linked to any other adapters."
    },
    3223192626: {
        "hex": "0xC01E0432",
        "id": "STATUS_GRAPHICS_CHAINLINKS_NOT_ENUMERATED",
        "desc": "Some chain adapters in a linked configuration have not yet been enumerated."
    },
    3223192628: {
        "hex": "0xC01E0434",
        "id": "STATUS_GRAPHICS_CHAINLINKS_NOT_STARTED",
        "desc": "An attempt was made to start a lead link display adapter when the chain links had not yet started."
    },
    3223192630: {
        "hex": "0xC01E0436",
        "id": "STATUS_GRAPHICS_INCONSISTENT_DEVICE_LINK_STATE",
        "desc": "The adapter link was found in an inconsistent state. Not all adapters are in an expected PNP/power state."
    },
    3223192635: {
        "hex": "0xC01E043B",
        "id": "STATUS_GRAPHICS_ADAPTER_ACCESS_NOT_EXCLUDED",
        "desc": "An operation is being attempted that requires the display adapter to be in a quiescent state."
    },
    3223192833: {
        "hex": "0xC01E0501",
        "id": "STATUS_GRAPHICS_COPP_NOT_SUPPORTED",
        "desc": "The driver does not support COPP."
    },
    3223192835: {
        "hex": "0xC01E0503",
        "id": "STATUS_GRAPHICS_OPM_INVALID_ENCRYPTED_PARAMETERS",
        "desc": "The specified encrypted parameters are invalid."
    },
    3223192837: {
        "hex": "0xC01E0505",
        "id": "STATUS_GRAPHICS_OPM_NO_PROTECTED_OUTPUTS_EXIST",
        "desc": "The GDI display device passed to this function does not have any active protected outputs."
    },
    3223192839: {
        "hex": "0xC01E0507",
        "id": "STATUS_GRAPHICS_PVP_DISPLAY_DEVICE_NOT_ATTACHED_TO_DESKTOP",
        "desc": "This function failed because the GDI display device passed to it was not attached to the Windows desktop."
    },
    3223192842: {
        "hex": "0xC01E050A",
        "id": "STATUS_GRAPHICS_OPM_INVALID_POINTER",
        "desc": "The function failed because an invalid pointer parameter was passed to it. A pointer parameter is invalid if it is null, is not correctly aligned, or it points to an invalid address or a kernel mode address."
    },
    3223192844: {
        "hex": "0xC01E050C",
        "id": "STATUS_GRAPHICS_OPM_INVALID_HANDLE",
        "desc": "The function failed because the caller passed in an invalid OPM user-mode handle."
    },
    3223192846: {
        "hex": "0xC01E050E",
        "id": "STATUS_GRAPHICS_PVP_INVALID_CERTIFICATE_LENGTH",
        "desc": "A certificate could not be returned because the certificate buffer passed to the function was too small."
    },
    3223192848: {
        "hex": "0xC01E0510",
        "id": "STATUS_GRAPHICS_OPM_THEATER_MODE_ENABLED",
        "desc": "DxgkDdiOpmCreateProtectedOutput() could not create a protected output because the video present target is in theater mode."
    },
    3223192850: {
        "hex": "0xC01E0512",
        "id": "STATUS_GRAPHICS_OPM_INVALID_SRM",
        "desc": "The HDCP SRM passed to this function did not comply with section 5 of the HDCP 1.1 specification."
    },
    3223192852: {
        "hex": "0xC01E0514",
        "id": "STATUS_GRAPHICS_OPM_OUTPUT_DOES_NOT_SUPPORT_ACP",
        "desc": "The protected output cannot enable analog copy protection because it does not support it."
    },
    3223192854: {
        "hex": "0xC01E0516",
        "id": "STATUS_GRAPHICS_OPM_HDCP_SRM_NEVER_SET",
        "desc": "DxgkDdiOPMGetInformation() cannot return the version of the SRM being used because the application never successfully passed an SRM to the protected output."
    },
    3223192856: {
        "hex": "0xC01E0518",
        "id": "STATUS_GRAPHICS_OPM_ALL_HDCP_HARDWARE_ALREADY_IN_USE",
        "desc": "DxgkDdiOPMConfigureProtectedOutput() cannot enable HDCP because other physical outputs are using the display adapter's HDCP hardware."
    },
    3223192859: {
        "hex": "0xC01E051B",
        "id": "STATUS_GRAPHICS_OPM_SESSION_TYPE_CHANGE_IN_PROGRESS",
        "desc": "OPM functions cannot be called when a session is changing its type. Three types of sessions currently exist: console, disconnected, and remote (RDP or ICA)."
    },
    3223192861: {
        "hex": "0xC01E051D",
        "id": "STATUS_GRAPHICS_OPM_INVALID_INFORMATION_REQUEST",
        "desc": "The DxgkDdiOPMGetInformation and DxgkDdiOPMGetCOPPCompatibleInformation functions return this error code if the passed-in sequence number is not the expected sequence number or the passed-in OMAC value is invalid."
    },
    3223192863: {
        "hex": "0xC01E051F",
        "id": "STATUS_GRAPHICS_OPM_PROTECTED_OUTPUT_DOES_NOT_HAVE_OPM_SEMANTICS",
        "desc": "The DxgkDdiOPMGetCOPPCompatibleInformation, DxgkDdiOPMGetInformation, or DxgkDdiOPMConfigureProtectedOutput function failed. This error is returned only if a protected output has COPP semantics."
    },
    3223192864: {
        "hex": "0xC01E0520",
        "id": "STATUS_GRAPHICS_OPM_SIGNALING_NOT_SUPPORTED",
        "desc": "The DxgkDdiOPMGetCOPPCompatibleInformation and DxgkDdiOPMConfigureProtectedOutput functions return this error if the display driver does not support the DXGKMDT_OPM_GET_ACP_AND_CGMSA_SIGNALING and DXGKMDT_OPM_SET_ACP_AND_CGMSA_SIGNALING GUIDs."
    },
    3223192960: {
        "hex": "0xC01E0580",
        "id": "STATUS_GRAPHICS_I2C_NOT_SUPPORTED",
        "desc": "The monitor connected to the specified video output does not have an I2C bus."
    },
    3223192962: {
        "hex": "0xC01E0582",
        "id": "STATUS_GRAPHICS_I2C_ERROR_TRANSMITTING_DATA",
        "desc": "An error occurred while transmitting data to the device on the I2C bus."
    },
    3223192964: {
        "hex": "0xC01E0584",
        "id": "STATUS_GRAPHICS_DDCCI_VCP_NOT_SUPPORTED",
        "desc": "The monitor does not support the specified VCP code."
    },
    3223192966: {
        "hex": "0xC01E0586",
        "id": "STATUS_GRAPHICS_DDCCI_MONITOR_RETURNED_INVALID_TIMING_STATUS_BYTE",
        "desc": "A function call failed because a monitor returned an invalid timing status byte when the operating system used the DDC/CI get timing report and timing message command to get a timing report from a monitor."
    },
    3223192968: {
        "hex": "0xC01E0588",
        "id": "STATUS_GRAPHICS_MCA_INTERNAL_ERROR",
        "desc": "An internal error caused an operation to fail."
    },
    3223192970: {
        "hex": "0xC01E058A",
        "id": "STATUS_GRAPHICS_DDCCI_INVALID_MESSAGE_LENGTH",
        "desc": "This error occurred because a DDC/CI message had an invalid value in its length field."
    },
    3223192972: {
        "hex": "0xC01E058C",
        "id": "STATUS_GRAPHICS_INVALID_PHYSICAL_MONITOR_HANDLE",
        "desc": "This function failed because an invalid monitor handle was passed to it."
    },
    3223193056: {
        "hex": "0xC01E05E0",
        "id": "STATUS_GRAPHICS_ONLY_CONSOLE_SESSION_SUPPORTED",
        "desc": "This function can be used only if a program is running in the local console session. It cannot be used if a program is running on a remote desktop session or on a terminal server session."
    },
    3223193058: {
        "hex": "0xC01E05E2",
        "id": "STATUS_GRAPHICS_DISPLAY_DEVICE_NOT_ATTACHED_TO_DESKTOP",
        "desc": "The function failed because the specified GDI display device was not attached to the Windows desktop."
    },
    3223193060: {
        "hex": "0xC01E05E4",
        "id": "STATUS_GRAPHICS_INVALID_POINTER",
        "desc": "The function failed because an invalid pointer parameter was passed to it. A pointer parameter is invalid if it is null, is not correctly aligned, or points to an invalid address or to a kernel mode address."
    },
    3223193062: {
        "hex": "0xC01E05E6",
        "id": "STATUS_GRAPHICS_PARAMETER_ARRAY_TOO_SMALL",
        "desc": "An array passed to the function cannot hold all of the data that the function must copy into the array."
    },
    3223193064: {
        "hex": "0xC01E05E8",
        "id": "STATUS_GRAPHICS_SESSION_TYPE_CHANGE_IN_PROGRESS",
        "desc": "The function failed because the current session is changing its type. This function cannot be called when the current session is changing its type. Three types of sessions currently exist: console, disconnected, and remote (RDP or ICA)."
    },
    3223388161: {
        "hex": "0xC0210001",
        "id": "STATUS_FVE_NOT_ENCRYPTED",
        "desc": "The volume is fully decrypted and no key is available."
    },
    3223388163: {
        "hex": "0xC0210003",
        "id": "STATUS_FVE_TOO_SMALL",
        "desc": "Not enough free space remains on the volume to allow encryption."
    },
    3223388165: {
        "hex": "0xC0210005",
        "id": "STATUS_FVE_FAILED_BAD_FS",
        "desc": "The file system is inconsistent. Run the Check Disk utility."
    },
    3223388167: {
        "hex": "0xC0210007",
        "id": "STATUS_FVE_FS_MOUNTED",
        "desc": "This operation cannot be performed while a file system is mounted on the volume."
    },
    3223388169: {
        "hex": "0xC0210009",
        "id": "STATUS_FVE_ACTION_NOT_ALLOWED",
        "desc": "The requested action was denied by the FVE control engine."
    },
    3223388171: {
        "hex": "0xC021000B",
        "id": "STATUS_FVE_VOLUME_NOT_BOUND",
        "desc": "The volume is not bound to the system."
    },
    3223388173: {
        "hex": "0xC021000D",
        "id": "STATUS_FVE_CONV_READ_ERROR",
        "desc": "A read operation failed while converting the volume."
    },
    3223388175: {
        "hex": "0xC021000F",
        "id": "STATUS_FVE_OVERLAPPED_UPDATE",
        "desc": "The control block for the encrypted volume was updated by another thread. Try again."
    },
    3223388177: {
        "hex": "0xC0210011",
        "id": "STATUS_FVE_FAILED_AUTHENTICATION",
        "desc": "BitLocker recovery authentication failed."
    },
    3223388179: {
        "hex": "0xC0210013",
        "id": "STATUS_FVE_KEYFILE_NOT_FOUND",
        "desc": "The BitLocker startup key or recovery password could not be read from external media."
    },
    3223388181: {
        "hex": "0xC0210015",
        "id": "STATUS_FVE_KEYFILE_NO_VMK",
        "desc": "The BitLocker encryption key could not be obtained from the startup key or the recovery password."
    },
    3223388183: {
        "hex": "0xC0210017",
        "id": "STATUS_FVE_TPM_SRK_AUTH_NOT_ZERO",
        "desc": "The authorization data for the SRK of the TPM is not zero."
    },
    3223388185: {
        "hex": "0xC0210019",
        "id": "STATUS_FVE_TPM_NO_VMK",
        "desc": "The BitLocker encryption key could not be obtained from the TPM."
    },
    3223388187: {
        "hex": "0xC021001B",
        "id": "STATUS_FVE_AUTH_INVALID_APPLICATION",
        "desc": "A boot application hash does not match the hash computed when BitLocker was turned on."
    },
    3223388189: {
        "hex": "0xC021001D",
        "id": "STATUS_FVE_DEBUGGER_ENABLED",
        "desc": "Boot debugging is enabled. Run Windows Boot Configuration Data Store Editor (bcdedit.exe) to turn it off."
    },
    3223388191: {
        "hex": "0xC021001F",
        "id": "STATUS_FVE_BAD_METADATA_POINTER",
        "desc": "The metadata disk region pointer is incorrect."
    },
    3223388193: {
        "hex": "0xC0210021",
        "id": "STATUS_FVE_REBOOT_REQUIRED",
        "desc": "No action was taken because a system restart is required."
    },
    3223388195: {
        "hex": "0xC0210023",
        "id": "STATUS_FVE_RAW_BLOCKED",
        "desc": "BitLocker Drive Encryption cannot enter RAW access mode for this volume."
    },
    3223388199: {
        "hex": "0xC0210027",
        "id": "STATUS_FVE_POLICY_USER_DISABLE_RDV_NOT_ALLOWED",
        "desc": "Group policy does not permit turning off BitLocker Drive Encryption on roaming data volumes."
    },
    3223388201: {
        "hex": "0xC0210029",
        "id": "STATUS_FVE_VIRTUALIZED_SPACE_TOO_BIG",
        "desc": "The requested virtualization size is too big."
    },
    3223453697: {
        "hex": "0xC0220001",
        "id": "STATUS_FWP_CALLOUT_NOT_FOUND",
        "desc": "The callout does not exist."
    },
    3223453699: {
        "hex": "0xC0220003",
        "id": "STATUS_FWP_FILTER_NOT_FOUND",
        "desc": "The filter does not exist."
    },
    3223453701: {
        "hex": "0xC0220005",
        "id": "STATUS_FWP_PROVIDER_NOT_FOUND",
        "desc": "The provider does not exist."
    },
    3223453703: {
        "hex": "0xC0220007",
        "id": "STATUS_FWP_SUBLAYER_NOT_FOUND",
        "desc": "The sublayer does not exist."
    },
    3223453705: {
        "hex": "0xC0220009",
        "id": "STATUS_FWP_ALREADY_EXISTS",
        "desc": "An object with that GUID or LUID already exists."
    },
    3223453707: {
        "hex": "0xC022000B",
        "id": "STATUS_FWP_DYNAMIC_SESSION_IN_PROGRESS",
        "desc": "The call is not allowed from within a dynamic session."
    },
    3223453709: {
        "hex": "0xC022000D",
        "id": "STATUS_FWP_NO_TXN_IN_PROGRESS",
        "desc": "The call must be made from within an explicit transaction."
    },
    3223453711: {
        "hex": "0xC022000F",
        "id": "STATUS_FWP_TXN_ABORTED",
        "desc": "The explicit transaction has been forcibly canceled."
    },
    3223453713: {
        "hex": "0xC0220011",
        "id": "STATUS_FWP_INCOMPATIBLE_TXN",
        "desc": "The call is not allowed from within a read-only transaction."
    },
    3223453715: {
        "hex": "0xC0220013",
        "id": "STATUS_FWP_NET_EVENTS_DISABLED",
        "desc": "The collection of network diagnostic events is disabled."
    },
    3223453717: {
        "hex": "0xC0220015",
        "id": "STATUS_FWP_KM_CLIENTS_ONLY",
        "desc": "The call is allowed for kernel-mode callers only."
    },
    3223453719: {
        "hex": "0xC0220017",
        "id": "STATUS_FWP_BUILTIN_OBJECT",
        "desc": "The object is built-in and cannot be deleted."
    },
    3223453720: {
        "hex": "0xC0220018",
        "id": "STATUS_FWP_TOO_MANY_CALLOUTS",
        "desc": "The maximum number of callouts has been reached."
    },
    3223453722: {
        "hex": "0xC022001A",
        "id": "STATUS_FWP_TRAFFIC_MISMATCH",
        "desc": "The traffic parameters do not match those for the security association context."
    },
    3223453724: {
        "hex": "0xC022001C",
        "id": "STATUS_FWP_NULL_POINTER",
        "desc": "A required pointer is null."
    },
    3223453726: {
        "hex": "0xC022001E",
        "id": "STATUS_FWP_INVALID_FLAGS",
        "desc": "The flags field contains an invalid value."
    },
    3223453728: {
        "hex": "0xC0220020",
        "id": "STATUS_FWP_INVALID_RANGE",
        "desc": "An FWP_RANGE is not valid."
    },
    3223453730: {
        "hex": "0xC0220022",
        "id": "STATUS_FWP_ZERO_LENGTH_ARRAY",
        "desc": "An array that must contain at least one element has a zero length."
    },
    3223453732: {
        "hex": "0xC0220024",
        "id": "STATUS_FWP_INVALID_ACTION_TYPE",
        "desc": "The action type is not one of the allowed action types for a filter."
    },
    3223453734: {
        "hex": "0xC0220026",
        "id": "STATUS_FWP_MATCH_TYPE_MISMATCH",
        "desc": "A filter condition contains a match type that is not compatible with the operands."
    },
    3223453736: {
        "hex": "0xC0220028",
        "id": "STATUS_FWP_OUT_OF_BOUNDS",
        "desc": "An integer value is outside the allowed range."
    },
    3223453738: {
        "hex": "0xC022002A",
        "id": "STATUS_FWP_DUPLICATE_CONDITION",
        "desc": "A filter cannot contain multiple conditions operating on a single field."
    },
    3223453740: {
        "hex": "0xC022002C",
        "id": "STATUS_FWP_ACTION_INCOMPATIBLE_WITH_LAYER",
        "desc": "The action type is not compatible with the layer."
    },
    3223453742: {
        "hex": "0xC022002E",
        "id": "STATUS_FWP_CONTEXT_INCOMPATIBLE_WITH_LAYER",
        "desc": "The raw context or the provider context is not compatible with the layer."
    },
    3223453744: {
        "hex": "0xC0220030",
        "id": "STATUS_FWP_INCOMPATIBLE_AUTH_METHOD",
        "desc": "The authentication method is not compatible with the policy type."
    },
    3223453746: {
        "hex": "0xC0220032",
        "id": "STATUS_FWP_EM_NOT_SUPPORTED",
        "desc": "An IKE policy cannot contain an Extended Mode policy."
    },
    3223453748: {
        "hex": "0xC0220034",
        "id": "STATUS_FWP_PROVIDER_CONTEXT_MISMATCH",
        "desc": "The provider context is of the wrong type."
    },
    3223453750: {
        "hex": "0xC0220036",
        "id": "STATUS_FWP_TOO_MANY_SUBLAYERS",
        "desc": "The maximum number of sublayers has been reached."
    },
    3223453752: {
        "hex": "0xC0220038",
        "id": "STATUS_FWP_INCOMPATIBLE_AUTH_CONFIG",
        "desc": "The IPsec authentication configuration is not compatible with the authentication type."
    },
    3223453756: {
        "hex": "0xC022003C",
        "id": "STATUS_FWP_DUPLICATE_AUTH_METHOD",
        "desc": "A policy cannot contain the same auth method more than once."
    },
    3223453953: {
        "hex": "0xC0220101",
        "id": "STATUS_FWP_INJECT_HANDLE_CLOSING",
        "desc": "The injection handle is being closed by another thread."
    },
    3223453955: {
        "hex": "0xC0220103",
        "id": "STATUS_FWP_CANNOT_PEND",
        "desc": "The classify cannot be pended."
    },
    3223519236: {
        "hex": "0xC0230004",
        "id": "STATUS_NDIS_BAD_VERSION",
        "desc": "An invalid version was specified."
    },
    3223519238: {
        "hex": "0xC0230006",
        "id": "STATUS_NDIS_ADAPTER_NOT_FOUND",
        "desc": "Failed to find the network interface or the network interface is not ready."
    },
    3223519240: {
        "hex": "0xC0230008",
        "id": "STATUS_NDIS_DEVICE_FAILED",
        "desc": "The network interface has encountered an internal unrecoverable failure."
    },
    3223519242: {
        "hex": "0xC023000A",
        "id": "STATUS_NDIS_MULTICAST_EXISTS",
        "desc": "An attempt was made to add a duplicate multicast address to the list."
    },
    3223519244: {
        "hex": "0xC023000C",
        "id": "STATUS_NDIS_REQUEST_ABORTED",
        "desc": "The network interface aborted the request."
    },
    3223519247: {
        "hex": "0xC023000F",
        "id": "STATUS_NDIS_INVALID_PACKET",
        "desc": "An attempt was made to send an invalid packet on a network interface."
    },
    3223519249: {
        "hex": "0xC0230011",
        "id": "STATUS_NDIS_ADAPTER_NOT_READY",
        "desc": "The network interface is not ready to complete this operation."
    },
    3223519253: {
        "hex": "0xC0230015",
        "id": "STATUS_NDIS_INVALID_DATA",
        "desc": "The data used for this operation is not valid."
    },
    3223519255: {
        "hex": "0xC0230017",
        "id": "STATUS_NDIS_INVALID_OID",
        "desc": "The network interface does not support this object identifier."
    },
    3223519257: {
        "hex": "0xC0230019",
        "id": "STATUS_NDIS_UNSUPPORTED_MEDIA",
        "desc": "The network interface does not support this media type."
    },
    3223519259: {
        "hex": "0xC023001B",
        "id": "STATUS_NDIS_FILE_NOT_FOUND",
        "desc": "An attempt was made to map a file that cannot be found."
    },
    3223519261: {
        "hex": "0xC023001D",
        "id": "STATUS_NDIS_ALREADY_MAPPED",
        "desc": "An attempt was made to map a file that is already mapped."
    },
    3223519263: {
        "hex": "0xC023001F",
        "id": "STATUS_NDIS_MEDIA_DISCONNECTED",
        "desc": "The I/O operation failed because the network media is disconnected or the wireless access point is out of range."
    },
    3223519274: {
        "hex": "0xC023002A",
        "id": "STATUS_NDIS_PAUSED",
        "desc": "The offload operation on the network interface has been paused."
    },
    3223519276: {
        "hex": "0xC023002C",
        "id": "STATUS_NDIS_UNSUPPORTED_REVISION",
        "desc": "The revision number specified in the structure is not supported."
    },
    3223519278: {
        "hex": "0xC023002E",
        "id": "STATUS_NDIS_INVALID_PORT_STATE",
        "desc": "The current state of the specified port on this network interface does not support the requested operation."
    },
    3223519419: {
        "hex": "0xC02300BB",
        "id": "STATUS_NDIS_NOT_SUPPORTED",
        "desc": "The network interface does not support this request."
    },
    3223523346: {
        "hex": "0xC0231012",
        "id": "STATUS_NDIS_OFFLOAD_CONNECTION_REJECTED",
        "desc": "The TCP connection is not offloadable by the Chimney offload target."
    },
    3223527424: {
        "hex": "0xC0232000",
        "id": "STATUS_NDIS_DOT11_AUTO_CONFIG_ENABLED",
        "desc": "The wireless LAN interface is in auto-configuration mode and does not support the requested parameter change operation."
    },
    3223527426: {
        "hex": "0xC0232002",
        "id": "STATUS_NDIS_DOT11_POWER_STATE_INVALID",
        "desc": "The wireless LAN interface is power down and does not support the requested operation."
    },
    3223527428: {
        "hex": "0xC0232004",
        "id": "STATUS_NDIS_PM_PROTOCOL_OFFLOAD_LIST_FULL",
        "desc": "The list of low power protocol offloads is full."
    },
    3224764418: {
        "hex": "0xC0360002",
        "id": "STATUS_IPSEC_SA_LIFETIME_EXPIRED",
        "desc": "The packet was received on an IPsec SA whose lifetime has expired."
    },
    3224764420: {
        "hex": "0xC0360004",
        "id": "STATUS_IPSEC_REPLAY_CHECK_FAILED",
        "desc": "The packet sequence number replay check failed."
    },
    3224764422: {
        "hex": "0xC0360006",
        "id": "STATUS_IPSEC_INTEGRITY_CHECK_FAILED",
        "desc": "The IPsec integrity check failed."
    },
    3224764424: {
        "hex": "0xC0360008",
        "id": "STATUS_IPSEC_AUTH_FIREWALL_DROP",
        "desc": "IPsec dropped an incoming ESP packet in authenticated firewall mode.  This drop is benign."
    },
    3224797184: {
        "hex": "0xC0368000",
        "id": "STATUS_IPSEC_DOSP_BLOCK",
        "desc": "IPsec Dos Protection matched an explicit block rule."
    },
    3224797186: {
        "hex": "0xC0368002",
        "id": "STATUS_IPSEC_DOSP_INVALID_PACKET",
        "desc": "IPsec Dos Protection received an incorrectly formatted packet."
    },
    3224797188: {
        "hex": "0xC0368004",
        "id": "STATUS_IPSEC_DOSP_MAX_ENTRIES",
        "desc": "IPsec Dos Protection failed to create state because there are already maximum number of entries allowed by policy."
    },
    3224797190: {
        "hex": "0xC0368006",
        "id": "STATUS_IPSEC_DOSP_MAX_PER_IP_RATELIMIT_QUEUES",
        "desc": "IPsec Dos Protection failed to create per internal IP ratelimit queue because there is already maximum number of queues allowed by policy."
    },
    3224895580: {
        "hex": "0xC038005C",
        "id": "STATUS_VOLMGR_RAID5_NOT_SUPPORTED",
        "desc": "The system does not support RAID-5 volumes."
    },
    3225026581: {
        "hex": "0xC03A0015",
        "id": "STATUS_VIRTDISK_NOT_VIRTUAL_DISK",
        "desc": "The specified disk is not a virtual disk."
    },
    3225026583: {
        "hex": "0xC03A0017",
        "id": "STATUS_VHD_CHILD_PARENT_SIZE_MISMATCH",
        "desc": "The chain of virtual hard disks is corrupted. There is a mismatch in the virtual sizes of the parent virtual hard disk and differencing disk."
    },
    3225026585: {
        "hex": "0xC03A0019",
        "id": "STATUS_VHD_DIFFERENCING_CHAIN_ERROR_IN_PARENT",
        "desc": "The chain of virtual hard disks is inaccessible. There was an error opening a virtual hard disk further up the chain."
    }

}